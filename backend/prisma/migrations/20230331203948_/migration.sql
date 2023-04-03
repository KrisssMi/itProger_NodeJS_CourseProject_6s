/*
  Warnings:

  - The `videoLink` column on the `Lecture` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Lecture" DROP COLUMN "videoLink",
ADD COLUMN     "videoLink" BYTEA;
