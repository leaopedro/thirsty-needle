import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantsResolver } from './participants.resolver';
import { PrismaService } from 'src/common/prisma.service';
import { ParticipantsService } from '../services/participants.service';

describe('ParticipantsResolver', () => {
  let resolver: ParticipantsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipantsResolver, PrismaService, ParticipantsService],
    }).compile();

    resolver = module.get<ParticipantsResolver>(ParticipantsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
