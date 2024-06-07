-- CreateTable
CREATE TABLE `pokemons_base_stats` (
    `pokemonId` INTEGER NOT NULL,
    `hp` INTEGER NOT NULL,
    `atk` INTEGER NOT NULL,
    `def` INTEGER NOT NULL,
    `spa` INTEGER NOT NULL,
    `spd` INTEGER NOT NULL,
    `spe` INTEGER NOT NULL,

    UNIQUE INDEX `pokemons_base_stats_pokemonId_key`(`pokemonId`),
    PRIMARY KEY (`pokemonId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pokemons_base_stats` ADD CONSTRAINT `pokemons_base_stats_pokemonId_fkey` FOREIGN KEY (`pokemonId`) REFERENCES `pokemons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
