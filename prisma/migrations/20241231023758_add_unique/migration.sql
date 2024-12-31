/*
  Warnings:

  - A unique constraint covering the columns `[UserId]` on the table `Salary` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Salary_UserId_key` ON `Salary`(`UserId`);
