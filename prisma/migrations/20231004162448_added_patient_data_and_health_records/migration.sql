/*
  Warnings:

  - You are about to drop the column `blood_group` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `phone_numbers` DROP FOREIGN KEY `phone_numbers_ibfk_1`;

-- DropForeignKey
ALTER TABLE `users_roles` DROP FOREIGN KEY `users_roles_ibfk_1`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `blood_group`;

-- CreateTable
CREATE TABLE `patient_health_records` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `blood_pressure_systolic` INTEGER NULL,
    `blood_pressure_diastolic` INTEGER NULL,
    `pulse_rate` INTEGER NULL,
    `temperature` INTEGER NULL,
    `weight` DECIMAL(5, 2) NULL,
    `height` INTEGER NULL,
    `anxiety_rate` INTEGER NULL,
    `depression_rate` INTEGER NULL,
    `waist` INTEGER NULL,
    `head` INTEGER NULL,
    `sugar_fasting` INTEGER NULL,
    `sugar_random` INTEGER NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `blood_group` VARCHAR(20) NULL,
    `height` VARCHAR(10) NULL,
    `weight` VARCHAR(10) NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users_roles` ADD CONSTRAINT `users_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `phone_numbers` ADD CONSTRAINT `phone_numbers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `patient_health_records` ADD CONSTRAINT `patient_health_records_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `patient_info` ADD CONSTRAINT `patient_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
