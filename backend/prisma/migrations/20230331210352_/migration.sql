/*
  Warnings:

  - You are about to alter the column `videoLink` on the `Lecture` table. The data in that column could be lost. The data in that column will be cast from `ByteA` to `VarChar(1000)`.

*/
-- AlterTable
ALTER TABLE "Lecture" ALTER COLUMN "videoLink" SET DATA TYPE VARCHAR(1000);
