-- CreateTable
CREATE TABLE `_pokemons_types` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_pokemons_types_AB_unique`(`A`, `B`),
    INDEX `_pokemons_types_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_pokemons_types` ADD CONSTRAINT `_pokemons_types_A_fkey` FOREIGN KEY (`A`) REFERENCES `pokemons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_pokemons_types` ADD CONSTRAINT `_pokemons_types_B_fkey` FOREIGN KEY (`B`) REFERENCES `types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
