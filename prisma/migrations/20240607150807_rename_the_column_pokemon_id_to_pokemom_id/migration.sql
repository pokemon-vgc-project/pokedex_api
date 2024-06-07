/*
  Warnings:

  - The primary key for the `pokemons_base_stats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `pokemonId` on the `pokemons_base_stats` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pokemon_id]` on the table `pokemons_base_stats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pokemon_id` to the `pokemons_base_stats` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `pokemons_base_stats` DROP FOREIGN KEY `pokemons_base_stats_pokemonId_fkey`;

-- AlterTable
ALTER TABLE `pokemons_base_stats` DROP PRIMARY KEY,
    DROP COLUMN `pokemonId`,
    ADD COLUMN `pokemon_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`pokemon_id`);

-- CreateIndex
CREATE UNIQUE INDEX `pokemons_base_stats_pokemon_id_key` ON `pokemons_base_stats`(`pokemon_id`);

-- AddForeignKey
ALTER TABLE `pokemons_base_stats` ADD CONSTRAINT `pokemons_base_stats_pokemon_id_fkey` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
