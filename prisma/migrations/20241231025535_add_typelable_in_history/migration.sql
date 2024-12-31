/*
  Warnings:

  - Added the required column `typelable` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `History` ADD COLUMN `typelable` VARCHAR(191) NOT NULL;
