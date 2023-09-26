/*
  Warnings:

  - You are about to drop the column `address` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - Made the column `doctor_id` on table `time_slots` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `time_slots` DROP FOREIGN KEY `time_slots_ibfk_1`;

-- AlterTable
ALTER TABLE `time_slots` MODIFY `doctor_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `address`,
    DROP COLUMN `phone`;

-- CreateTable
CREATE TABLE `phone_numbers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country_code` VARCHAR(5) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `time_slots` ADD CONSTRAINT `time_slots_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `phone_numbers` ADD CONSTRAINT `phone_numbers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
