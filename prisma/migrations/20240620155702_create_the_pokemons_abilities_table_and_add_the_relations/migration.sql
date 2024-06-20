/*
  Warnings:

  - You are about to drop the `_pokemons_abilities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_pokemons_abilities` DROP FOREIGN KEY `_pokemons_abilities_A_fkey`;

-- DropForeignKey
ALTER TABLE `_pokemons_abilities` DROP FOREIGN KEY `_pokemons_abilities_B_fkey`;

-- DropTable
DROP TABLE `_pokemons_abilities`;

-- CreateTable
CREATE TABLE `pokemons_abilities` (
    `pokemon_id` INTEGER NOT NULL,
    `abilityId` INTEGER NOT NULL,
    `abilityType` ENUM('HIDDEN', 'SPECIAL') NULL,

    PRIMARY KEY (`pokemon_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pokemons_abilities` ADD CONSTRAINT `pokemons_abilities_pokemon_id_fkey` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemons_abilities` ADD CONSTRAINT `pokemons_abilities_abilityId_fkey` FOREIGN KEY (`abilityId`) REFERENCES `abilities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
