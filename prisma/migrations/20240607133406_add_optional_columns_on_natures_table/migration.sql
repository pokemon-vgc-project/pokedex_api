-- AlterTable
ALTER TABLE `natures` MODIFY `increase` ENUM('ATK', 'DEF', 'SPA', 'SPD', 'SPE') NULL,
    MODIFY `decrease` ENUM('ATK', 'DEF', 'SPA', 'SPD', 'SPE') NULL;
