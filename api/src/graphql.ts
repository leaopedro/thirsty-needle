
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IQuery {
    participants(): Participant[] | Promise<Participant[]>;
    trials(): Trial[] | Promise<Trial[]>;
}

export interface Participant {
    id: string;
    name: string;
    hasDiabetes: boolean;
    hadCovid: boolean;
    heightInInches: number;
    weightInPounds: number;
    enrolledAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    trial?: Nullable<Trial>;
}

export interface Trial {
    id: string;
    name: string;
    participantsCount: number;
}

export type DateTime = any;
type Nullable<T> = T | null;
