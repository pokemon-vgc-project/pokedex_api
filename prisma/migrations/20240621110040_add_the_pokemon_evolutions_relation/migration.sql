-- AlterTable
ALTER TABLE `pokemons` ADD COLUMN `evo_level` INTEGER NULL;

-- CreateTable
CREATE TABLE `_pokemons_evolutions` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_pokemons_evolutions_AB_unique`(`A`, `B`),
    INDEX `_pokemons_evolutions_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_pokemons_evolutions` ADD CONSTRAINT `_pokemons_evolutions_A_fkey` FOREIGN KEY (`A`) REFERENCES `pokemons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_pokemons_evolutions` ADD CONSTRAINT `_pokemons_evolutions_B_fkey` FOREIGN KEY (`B`) REFERENCES `pokemons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
