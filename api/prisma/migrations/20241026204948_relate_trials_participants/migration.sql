/*
  Warnings:

  - You are about to drop the `_ParticipantToTrial` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ParticipantToTrial" DROP CONSTRAINT "_ParticipantToTrial_A_fkey";

-- DropForeignKey
ALTER TABLE "_ParticipantToTrial" DROP CONSTRAINT "_ParticipantToTrial_B_fkey";

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "trialId" TEXT;

-- DropTable
DROP TABLE "_ParticipantToTrial";

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_trialId_fkey" FOREIGN KEY ("trialId") REFERENCES "Trial"("id") ON DELETE SET NULL ON UPDATE CASCADE;
