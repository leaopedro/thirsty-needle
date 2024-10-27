import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ParticipantsService } from '../services/participants.service';
import { Participant } from 'src/graphql';
import { EnrollParticipantInput } from '../dto/enroll-participant.input';

@Resolver()
export class ParticipantsResolver {
  constructor(private participantsService: ParticipantsService) {}

  @Query('participants')
  async participants(): Promise<Participant[]> {
    return await this.participantsService.getParticipants();
  }

  @Mutation('enrollParticipant')
  async enrollParticipant(
    @Args('input') input: EnrollParticipantInput,
  ): Promise<Participant> {
    return this.participantsService.enrollParticipant(input);
  }
}
