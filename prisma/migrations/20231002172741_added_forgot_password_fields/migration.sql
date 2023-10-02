-- AlterTable
ALTER TABLE `users` ADD COLUMN `forgot_otp_sent_at` TIMESTAMP(0) NULL,
    ADD COLUMN `forgot_password_otp` INTEGER NULL,
    ADD COLUMN `is_forgot_otp_verified` TINYINT NULL DEFAULT 0;
