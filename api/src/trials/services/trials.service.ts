import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { Trial } from 'src/graphql';

@Injectable()
export class TrialsService {
  constructor(private prisma: PrismaService) {}

  async getTrialsWithParticipantsCount(): Promise<Trial[]> {
    const trials = await this.prisma.trial.findMany({
      include: {
        participants: true,
      },
    });

    return trials.map(trial => ({
      ...trial,
      participantsCount: trial.participants.length,
    }));
  }
}