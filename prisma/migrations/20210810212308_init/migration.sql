-- CreateTable
CREATE TABLE `company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45),
    `email` VARCHAR(45),
    `password` VARCHAR(45),
    `phone` VARCHAR(45),
    `county` VARCHAR(45),
    `token` VARCHAR(45),
    `taxpayernumber` VARCHAR(45),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `complain` (
    `company_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `complain` VARCHAR(45) NOT NULL,
    `status` VARCHAR(45),
    `rate` VARCHAR(45) NOT NULL,
    `protocol_number` VARCHAR(45) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    INDEX `fk_company_has_user_company_idx`(`company_id`),
    INDEX `fk_company_has_user_user1_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `complain_message` (
    `complain_id` INTEGER NOT NULL,
    `complain_message` VARCHAR(45) NOT NULL,
    `origin` VARCHAR(45) NOT NULL,
    `id` VARCHAR(45) NOT NULL,

    INDEX `fk_complain_message_complain1`(`complain_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45),
    `email` VARCHAR(45),
    `password` VARCHAR(45),
    `pps` VARCHAR(45),
    `county` VARCHAR(45),
    `phone` VARCHAR(45),
    `token` VARCHAR(45),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `complain` ADD FOREIGN KEY (`company_id`) REFERENCES `company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `complain` ADD FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `complain_message` ADD FOREIGN KEY (`complain_id`) REFERENCES `complain`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
