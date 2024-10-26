
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
}

export interface Trial {
    id: string;
    name: string;
}

export type DateTime = any;
export type Decimal = any;
type Nullable<T> = T | null;
