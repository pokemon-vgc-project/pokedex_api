/*
  Warnings:

  - The primary key for the `pokemons_abilities` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `pokemons_abilities` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`pokemon_id`, `abilityId`);
