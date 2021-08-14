/*
  Warnings:

  - Added the required column `category` to the `complain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `complain` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `complain` ADD COLUMN `category` VARCHAR(45) NOT NULL,
    ADD COLUMN `title` VARCHAR(45) NOT NULL;
