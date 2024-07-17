import { Module } from '@nestjs/common';
import { PokemonController } from './controllers/pokemon.controller';
import { PokemonTypeService } from './services/pokemon_type.service';

@Module({
  controllers: [PokemonController],
  providers: [PokemonTypeService],
})
export class PokemonModule {}
