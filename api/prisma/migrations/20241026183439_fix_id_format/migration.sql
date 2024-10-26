/*
  Warnings:

  - The primary key for the `Participant` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_ParticipantToTrial" DROP CONSTRAINT "_ParticipantToTrial_A_fkey";

-- AlterTable
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Participant_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Participant_id_seq";

-- AlterTable
ALTER TABLE "_ParticipantToTrial" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_ParticipantToTrial" ADD CONSTRAINT "_ParticipantToTrial_A_fkey" FOREIGN KEY ("A") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
