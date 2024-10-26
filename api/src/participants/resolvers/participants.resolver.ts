import { Resolver, Query } from '@nestjs/graphql';
import { ParticipantsService } from '../services/participants.service';
import { Participant } from 'src/graphql';

@Resolver()
export class ParticipantsResolver {
  constructor(private participantsService: ParticipantsService) {}

  @Query('participants')
  async participants(): Promise<Participant[]> {
    return await this.participantsService.getParticipants();
  }
}
