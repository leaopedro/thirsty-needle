import { Module } from '@nestjs/common';
import { ParticipantsResolver } from './resolvers/participants.resolver';
import { ParticipantsService } from './services/participants.service';
import { PrismaService } from 'src/common/prisma.service';


@Module({
  providers: [ParticipantsResolver, ParticipantsService, PrismaService],
})
export class ParticipantsModule {}
