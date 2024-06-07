-- CreateTable
CREATE TABLE `pokemons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `num` INTEGER NOT NULL,
    `base_species_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `forme` VARCHAR(191) NULL,
    `heightm` DOUBLE NULL,
    `weightkg` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pokemons` ADD CONSTRAINT `pokemons_base_species_id_fkey` FOREIGN KEY (`base_species_id`) REFERENCES `pokemons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
