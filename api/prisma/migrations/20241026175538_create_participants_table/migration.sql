/*
  Warnings:

  - Added the required column `name` to the `Trial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trial" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hasDiabetes" BOOLEAN NOT NULL,
    "hadCovid" BOOLEAN NOT NULL,
    "heightInInches" DECIMAL(5,2) NOT NULL,
    "weightInPounds" DECIMAL(5,2) NOT NULL,
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ParticipantToTrial" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Participant_hasDiabetes_hadCovid_idx" ON "Participant"("hasDiabetes", "hadCovid");

-- CreateIndex
CREATE UNIQUE INDEX "_ParticipantToTrial_AB_unique" ON "_ParticipantToTrial"("A", "B");

-- CreateIndex
CREATE INDEX "_ParticipantToTrial_B_index" ON "_ParticipantToTrial"("B");

-- AddForeignKey
ALTER TABLE "_ParticipantToTrial" ADD CONSTRAINT "_ParticipantToTrial_A_fkey" FOREIGN KEY ("A") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParticipantToTrial" ADD CONSTRAINT "_ParticipantToTrial_B_fkey" FOREIGN KEY ("B") REFERENCES "Trial"("id") ON DELETE CASCADE ON UPDATE CASCADE;
