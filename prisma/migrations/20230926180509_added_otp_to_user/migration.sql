-- AlterTable
ALTER TABLE `users` ADD COLUMN `is_verified` TINYINT NULL DEFAULT 0,
    ADD COLUMN `otp` INTEGER NULL,
    ADD COLUMN `otp_sent_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0);
