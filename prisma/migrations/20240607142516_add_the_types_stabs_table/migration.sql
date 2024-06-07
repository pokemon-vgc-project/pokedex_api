-- CreateTable
CREATE TABLE `types_stabs` (
    `attacker_id` INTEGER NOT NULL,
    `defender_id` INTEGER NOT NULL,
    `rate` INTEGER NOT NULL,

    PRIMARY KEY (`attacker_id`, `defender_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `types_stabs` ADD CONSTRAINT `types_stabs_attacker_id_fkey` FOREIGN KEY (`attacker_id`) REFERENCES `types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `types_stabs` ADD CONSTRAINT `types_stabs_defender_id_fkey` FOREIGN KEY (`defender_id`) REFERENCES `types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
