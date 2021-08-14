/*
  Warnings:

  - The primary key for the `complain_message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `origin` on the `complain_message` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `complain_message` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `Int`.

*/
-- AlterTable
ALTER TABLE `complain` MODIFY `rate` VARCHAR(45);

-- AlterTable
ALTER TABLE `complain_message` DROP PRIMARY KEY,
    DROP COLUMN `origin`,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
