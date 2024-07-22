import { Module } from '@nestjs/common';
import { PokemonController } from './controllers/pokemon.controller';
import { PokemonTypeService } from './services/pokemon_type.service';
import { PokemonService } from './services/pokemon.service';

@Module({
  controllers: [PokemonController],
  providers: [PokemonTypeService, PokemonService],
})
export class PokemonModule {}
