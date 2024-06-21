-- DropForeignKey
ALTER TABLE `pokemons` DROP FOREIGN KEY `pokemons_base_species_id_fkey`;

-- AlterTable
ALTER TABLE `pokemons` MODIFY `base_species_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `pokemons` ADD CONSTRAINT `pokemons_base_species_id_fkey` FOREIGN KEY (`base_species_id`) REFERENCES `pokemons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
