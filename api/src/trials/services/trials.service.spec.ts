// trials.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TrialsService } from './trials.service';
import { PrismaService } from 'src/common/prisma.service';
import { Trial } from 'src/graphql';

describe('TrialsService', () => {
  let service: TrialsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrialsService, PrismaService],
    }).compile();

    service = module.get<TrialsService>(TrialsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTrialsWithParticipantsCount', () => {
    it('should return an array of trials with participants count', async () => {
      const mockTrials = [
        {
          id: '1',
          name: 'Trial 1',
          participants: [{id: '1'}, {id: '2'}, {id: '3'}],
        },
        {
          id: '2',
          name: 'Trial 2',
          participants: [{id: '4'}],
        },
      ];

      jest.spyOn(prismaService.trial, 'findMany').mockResolvedValue(mockTrials);

      const result: Trial[] = await service.getTrialsWithParticipantsCount();

      expect(result).toEqual([
        {
          id: '1',
          name: 'Trial 1',
          participantsCount: 3,
        },
        {
          id: '2',
          name: 'Trial 2',
          participantsCount: 1,
        },
      ]);
    });
  });
});