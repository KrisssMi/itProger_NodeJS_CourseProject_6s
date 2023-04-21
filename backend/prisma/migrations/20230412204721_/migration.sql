-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_category_fkey";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "category" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("name") ON DELETE CASCADE ON UPDATE CASCADE;
