import { Test, TestingModule } from '@nestjs/testing';
import { TrialsResolver } from './trials.resolver';
import { PrismaService } from 'src/common/prisma.service';
import { TrialsService } from '../services/trials.service';
import { Trial } from 'src/graphql';

describe('TrialsResolver', () => {
  let resolver: TrialsResolver;
  let trialsService: TrialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrialsResolver, PrismaService, TrialsService],
    }).compile();

    resolver = module.get<TrialsResolver>(TrialsResolver);
    trialsService = module.get<TrialsService>(TrialsService);
  });

  describe('trials', () => {
    it('should return an array of trials with participants count', async () => {
      const result: Trial[] = [
        {
          id: '1',
          name: 'Trial 1',
          participantsCount: 10,
        },
        {
          id: '2',
          name: 'Trial 2',
          participantsCount: 5,
        },
      ];

      jest.spyOn(trialsService, 'getTrialsWithParticipantsCount').mockResolvedValue(result);

      expect(await resolver.trials()).toEqual(result);
    });
  });
});
