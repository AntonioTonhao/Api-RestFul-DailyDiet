/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - The required column `Userid` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_user_Id_fkey";

-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "email",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "Userid" TEXT NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("Userid");

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "users"("Userid") ON DELETE RESTRICT ON UPDATE CASCADE;
