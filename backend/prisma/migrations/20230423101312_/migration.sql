/*
  Warnings:

  - The `category` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Statistic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_category_fkey";

-- DropForeignKey
ALTER TABLE "Statistic" DROP CONSTRAINT "Statistic_lecture_id_fkey";

-- DropForeignKey
ALTER TABLE "Statistic" DROP CONSTRAINT "Statistic_user_id_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "category",
ADD COLUMN     "category" INTEGER;

-- DropTable
DROP TABLE "Statistic";

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "handle" TEXT NOT NULL,
    "skills" TEXT[],
    "bio" TEXT,
    "githubusername" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "school" TEXT NOT NULL,
    "fieldofstudy" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3),

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
