-- CreateTable
CREATE TABLE `natures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `increase` ENUM('ATK', 'DEF', 'SPA', 'SPD', 'SPE') NOT NULL,
    `decrease` ENUM('ATK', 'DEF', 'SPA', 'SPD', 'SPE') NOT NULL,

    UNIQUE INDEX `natures_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
