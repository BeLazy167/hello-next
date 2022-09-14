/*
  Warnings:

  - A unique constraint covering the columns `[day]` on the table `Snack` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "Snack_day_key" ON "Snack"("day");
