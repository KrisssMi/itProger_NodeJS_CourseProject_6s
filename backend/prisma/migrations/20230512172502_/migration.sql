/*
  Warnings:

  - You are about to drop the column `checked` on the `Enrollment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "theory" TEXT,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "description" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "checked";

-- AlterTable
ALTER TABLE "Lecture" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "content" SET DATA TYPE TEXT,
ALTER COLUMN "videoLink" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "password" SET DATA TYPE TEXT;
