-- CreateTable
CREATE TABLE `_pokemons_abilities` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_pokemons_abilities_AB_unique`(`A`, `B`),
    INDEX `_pokemons_abilities_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_pokemons_abilities` ADD CONSTRAINT `_pokemons_abilities_A_fkey` FOREIGN KEY (`A`) REFERENCES `abilities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_pokemons_abilities` ADD CONSTRAINT `_pokemons_abilities_B_fkey` FOREIGN KEY (`B`) REFERENCES `pokemons`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
