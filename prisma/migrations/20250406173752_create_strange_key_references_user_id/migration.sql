/*
  Warnings:

  - Added the required column `user_Id` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "meals" ADD COLUMN     "user_Id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
