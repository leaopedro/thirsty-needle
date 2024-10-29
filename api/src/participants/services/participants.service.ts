import { Injectable, BadRequestException } from '@nestjs/common';
import { Participant, Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { EnrollParticipantInput } from '../dto/enroll-participant.input';

@Injectable()
export class ParticipantsService {
  constructor(private prismaService: PrismaService) {}

  async getParticipants(whereInput?: Prisma.ParticipantWhereInput) {
    return this.prismaService.participant.findMany({ where: whereInput });
  }

  async enrollParticipant(data: EnrollParticipantInput): Promise<Participant> {
    const { trialId, ...participantData } = data;

    const { hasDiabetes, hadCovid, heightInInches, weightInPounds } =
      participantData;

    const height = Number(heightInInches);
    const weight = Number(weightInPounds);

    // formula: BMI = (weight / (height^2)) * 703
    const bmi = (weight / (height * height)) * 703;

    if (!hasDiabetes) {
      throw new BadRequestException('Participant must have diabetes.');
    }

    if (hadCovid) {
      throw new BadRequestException('Participant must not have had COVID-19.');
    }

    if (bmi <= 18 || bmi >= 30) {
      throw new BadRequestException(
        `Participant BMI must be greater than 18 and less than 30. Current BMI: ${bmi}`,
      );
    }

    const prismaData: Prisma.ParticipantCreateInput = {
      ...participantData,
      trial: trialId ? { connect: { id: trialId } } : undefined,
    };

    return this.prismaService.participant.create({ data: prismaData });
  }
}
