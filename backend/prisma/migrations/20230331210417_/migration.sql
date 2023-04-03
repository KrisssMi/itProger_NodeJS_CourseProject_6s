/*
  Warnings:

  - You are about to alter the column `videoLink` on the `Lecture` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1000)` to `VarChar(400)`.

*/
-- AlterTable
ALTER TABLE "Lecture" ALTER COLUMN "videoLink" SET DATA TYPE VARCHAR(400);
