import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class EnrollParticipantInput {
  @Field()
  name: string;

  @Field()
  hasDiabetes: boolean;

  @Field()
  hadCovid: boolean;

  @Field()
  heightInInches: number;

  @Field()
  weightInPounds: number;

  @Field()
  trialId: string;
}