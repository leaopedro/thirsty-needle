import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantsService } from './participants.service';
import { PrismaService } from 'src/common/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { EnrollParticipantInput } from '../dto/enroll-participant.input';
import { Participant } from '@prisma/client';

describe('ParticipantsService', () => {
  let service: ParticipantsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipantsService, PrismaService],
    }).compile();

    service = module.get<ParticipantsService>(ParticipantsService);
    prismaService = module.get<PrismaService>(PrismaService);

    jest.spyOn(prismaService.participant, 'create').mockImplementation(jest.fn());
    jest.spyOn(prismaService.participant, 'findMany').mockImplementation(jest.fn());
  });

  describe('enrollParticipant', () => {
    it('should enroll a participant successfully when eligible', async () => {
      const input: EnrollParticipantInput = {
        name: 'John Doe',
        hasDiabetes: true,
        hadCovid: false,
        heightInInches: 66,
        weightInPounds: 150,
        trialId: 'trial-123',
      };

      const expectedParticipant: Participant = {
        id: 'participant-123',
        name: input.name,
        hasDiabetes: input.hasDiabetes,
        hadCovid: input.hadCovid,
        heightInInches: input.heightInInches,
        weightInPounds: input.weightInPounds,
        enrolledAt: new Date(),
        updatedAt: new Date(),
        trialId: input.trialId,
      };

      (prismaService.participant.create as jest.Mock).mockResolvedValue(expectedParticipant);

      const result = await service.enrollParticipant(input);

      expect(result).toEqual(expectedParticipant);
      expect(prismaService.participant.create).toHaveBeenCalledWith({
        data: {
          name: input.name,
          hasDiabetes: input.hasDiabetes,
          hadCovid: input.hadCovid,
          heightInInches: input.heightInInches,
          weightInPounds: input.weightInPounds,
          trial: { connect: { id: input.trialId } },
        },
      });
    });

    it('should throw BadRequestException if participant does not have diabetes', async () => {
      const input: EnrollParticipantInput = {
        name: 'Jane Doe',
        hasDiabetes: false,
        hadCovid: false,
        heightInInches: 66,
        weightInPounds: 150,
        trialId: 'trial-123',
      };

      await expect(service.enrollParticipant(input)).rejects.toThrow(BadRequestException);
      await expect(service.enrollParticipant(input)).rejects.toThrow(
        'Participant must have diabetes.',
      );
      expect(prismaService.participant.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException if participant had COVID-19', async () => {
      const input: EnrollParticipantInput = {
        name: 'Bob Smith',
        hasDiabetes: true,
        hadCovid: true,
        heightInInches: 66,
        weightInPounds: 150,
        trialId: 'trial-123',
      };

      await expect(service.enrollParticipant(input)).rejects.toThrow(BadRequestException);
      await expect(service.enrollParticipant(input)).rejects.toThrow(
        'Participant must not have had COVID-19.',
      );
      expect(prismaService.participant.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException if participant BMI is less than or equal to 18', async () => {
      const input: EnrollParticipantInput = {
        name: 'Alice Brown',
        hasDiabetes: true,
        hadCovid: false,
        heightInInches: 70,
        weightInPounds: 110, // BMI ≈ 15.8
        trialId: 'trial-123',
      };

      await expect(service.enrollParticipant(input)).rejects.toThrow(BadRequestException);
      await expect(service.enrollParticipant(input)).rejects.toThrow(
        /Participant BMI must be greater than 18 and less than 30\. Current BMI: \d+(\.\d+)?/,
      );
      expect(prismaService.participant.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException if participant BMI is greater than or equal to 30', async () => {
      const input: EnrollParticipantInput = {
        name: 'Charlie Green',
        hasDiabetes: true,
        hadCovid: false,
        heightInInches: 65,
        weightInPounds: 220, // BMI ≈ 36.6
        trialId: 'trial-123',
      };

      await expect(service.enrollParticipant(input)).rejects.toThrow(BadRequestException);
      await expect(service.enrollParticipant(input)).rejects.toThrow(
        /Participant BMI must be greater than 18 and less than 30\. Current BMI: \d+(\.\d+)?/,
      );
      expect(prismaService.participant.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException if height or weight is invalid', async () => {
      const input: EnrollParticipantInput = {
        name: 'Eve White',
        hasDiabetes: true,
        hadCovid: false,
        heightInInches: 0, // Invalid height
        weightInPounds: 150,
        trialId: 'trial-123',
      };

      await expect(service.enrollParticipant(input)).rejects.toThrow(BadRequestException);
      expect(prismaService.participant.create).not.toHaveBeenCalled();
    });
  });
});
