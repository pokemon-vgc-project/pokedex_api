/*
  Warnings:

  - You are about to drop the column `abilityType` on the `pokemons_abilities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pokemons_abilities` DROP COLUMN `abilityType`,
    ADD COLUMN `ability_type` ENUM('HIDDEN', 'SPECIAL') NULL;
