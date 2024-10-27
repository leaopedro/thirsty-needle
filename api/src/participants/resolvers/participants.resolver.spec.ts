// src/participants/resolvers/participants.resolver.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantsResolver } from './participants.resolver';
import { ParticipantsService } from '../services/participants.service';
import { EnrollParticipantInput } from '../dto/enroll-participant.input';
import { Participant, Trial } from 'src/graphql';
import { BadRequestException } from '@nestjs/common';

describe('ParticipantsResolver', () => {
  let resolver: ParticipantsResolver;
  let participantsService: ParticipantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParticipantsResolver,
        {
          provide: ParticipantsService,
          useValue: {
            getParticipants: jest.fn(),
            enrollParticipant: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<ParticipantsResolver>(ParticipantsResolver);
    participantsService = module.get<ParticipantsService>(ParticipantsService);
  });

  describe('participants query', () => {
    it('should return a list of participants', async () => {
      const participants: Participant[] = [
        {
          id: 'participant-1',
          name: 'John Doe',
          hasDiabetes: true,
          hadCovid: false,
          heightInInches: 66,
          weightInPounds: 150,
          enrolledAt: new Date(),
          updatedAt: new Date(),
          trial: null,
        },
      ];

      (participantsService.getParticipants as jest.Mock).mockResolvedValue(participants);

      const result = await resolver.participants();

      expect(result).toEqual(participants);
      expect(participantsService.getParticipants).toHaveBeenCalledWith();
    });
  });

  describe('enrollParticipant mutation', () => {
    it('should enroll a participant successfully', async () => {
      const input: EnrollParticipantInput = {
        name: 'Jane Doe',
        hasDiabetes: true,
        hadCovid: false,
        heightInInches: 65,
        weightInPounds: 140,
        trialId: 'trial-123',
      };

      const expectedParticipant: Participant = {
        id: 'participant-2',
        name: input.name,
        hasDiabetes: input.hasDiabetes,
        hadCovid: input.hadCovid,
        heightInInches: input.heightInInches,
        weightInPounds: input.weightInPounds,
        enrolledAt: new Date(),
        updatedAt: new Date(),
        trial: {
          id: input.trialId,
          name: 'Trial 123',
          participantsCount: 1,
        },
      };

      (participantsService.enrollParticipant as jest.Mock).mockResolvedValue(expectedParticipant);

      const result = await resolver.enrollParticipant(input);

      expect(result).toEqual(expectedParticipant);
      expect(participantsService.enrollParticipant).toHaveBeenCalledWith(input);
    });

    it('should throw an error when enrollment fails due to validation', async () => {
      const input: EnrollParticipantInput = {
        name: 'Bob Smith',
        hasDiabetes: false, // Ineligible participant
        hadCovid: false,
        heightInInches: 70,
        weightInPounds: 180,
        trialId: 'trial-456',
      };

      const error = new BadRequestException('Participant must have diabetes.');

      (participantsService.enrollParticipant as jest.Mock).mockRejectedValue(error);

      await expect(resolver.enrollParticipant(input)).rejects.toThrow(BadRequestException);
      await expect(resolver.enrollParticipant(input)).rejects.toThrow('Participant must have diabetes.');
      expect(participantsService.enrollParticipant).toHaveBeenCalledWith(input);
    });
  });
});
