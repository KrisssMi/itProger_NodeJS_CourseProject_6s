-- DropIndex
DROP INDEX "Notification_courseId_key";

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "courseId" DROP NOT NULL;
