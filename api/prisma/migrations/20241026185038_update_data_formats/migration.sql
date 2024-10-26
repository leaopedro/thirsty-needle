/*
  Warnings:

  - You are about to alter the column `heightInInches` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `DoublePrecision`.
  - You are about to alter the column `weightInPounds` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Participant" ALTER COLUMN "heightInInches" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "weightInPounds" SET DATA TYPE DOUBLE PRECISION;
