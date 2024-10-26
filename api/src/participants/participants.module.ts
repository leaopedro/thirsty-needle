import { Module } from '@nestjs/common';
import { ParticipantsResolver } from './resolvers/participants.resolver';
import { ParticipantsService } from './services/participants.service';
import { PrismaService } from 'src/common/prisma.service';
import { TrialsResolver } from 'src/trials/resolvers/trials.resolver';
import { TrialsService } from 'src/trials/services/trials.service';

@Module({
  providers: [ParticipantsResolver, ParticipantsService, TrialsResolver, TrialsService, PrismaService],
})
export class ParticipantsModule {}