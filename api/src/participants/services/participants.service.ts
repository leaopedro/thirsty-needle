import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class ParticipantsService {
  constructor(private prismaService: PrismaService) {}

  async getParticipants(whereInput?: Prisma.ParticipantWhereInput) {
    return this.prismaService.participant.findMany({ where: whereInput });
  }
}
