/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface EnrollParticipantInput {
  name: string;
  hasDiabetes: boolean;
  hadCovid: boolean;
  heightInInches: number;
  weightInPounds: number;
  trialId: string;
}

export interface IQuery {
  participants(): Participant[] | Promise<Participant[]>;
  trials(): Trial[] | Promise<Trial[]>;
}

export interface IMutation {
  enrollParticipant(
    input: EnrollParticipantInput,
  ): Participant | Promise<Participant>;
}

export interface Participant {
  id: string;
  name: string;
  hasDiabetes: boolean;
  hadCovid: boolean;
  heightInInches: number;
  weightInPounds: number;
  enrolledAt: DateTime;
  updatedAt: DateTime;
  trial?: Nullable<Trial>;
}

export interface Trial {
  id: string;
  name: string;
  participantsCount: number;
}

export type DateTime = any;
type Nullable<T> = T | null;
