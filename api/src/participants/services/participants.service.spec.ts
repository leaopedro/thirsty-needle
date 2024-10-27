import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantsService } from './participants.service';
import { PrismaService } from 'src/common/prisma.service';

describe('ParticipantsService', () => {
  let service: ParticipantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipantsService, PrismaService],
    }).compile();

    service = module.get<ParticipantsService>(ParticipantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
