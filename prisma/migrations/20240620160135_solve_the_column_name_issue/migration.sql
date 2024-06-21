/*
  Warnings:

  - The primary key for the `pokemons_abilities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `abilityId` on the `pokemons_abilities` table. All the data in the column will be lost.
  - Added the required column `ability_id` to the `pokemons_abilities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `pokemons_abilities` DROP FOREIGN KEY `pokemons_abilities_abilityId_fkey`;

-- AlterTable
ALTER TABLE `pokemons_abilities` DROP PRIMARY KEY,
    DROP COLUMN `abilityId`,
    ADD COLUMN `ability_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`pokemon_id`, `ability_id`);

-- AddForeignKey
ALTER TABLE `pokemons_abilities` ADD CONSTRAINT `pokemons_abilities_ability_id_fkey` FOREIGN KEY (`ability_id`) REFERENCES `abilities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
