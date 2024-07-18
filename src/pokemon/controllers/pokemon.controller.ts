import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { from, map, Observable } from 'rxjs';
import { pokedex } from 'src/domain/proto/pokedex';
import { PokemonTypeService } from '../services/pokemon_type.service';
import { PaginationHelper } from 'src/infra/pagination/helpers/pagination.helper';
import {
  PokedexServices,
  PokemonServiceMethods,
} from '@pokemon-vgc-project/lib-proto';

@Controller()
export class PokemonController implements pokedex.PokemonService {
  constructor(
    private readonly pokemonTypeService: PokemonTypeService,
    private readonly paginationHelper: PaginationHelper,
  ) {}

  @GrpcMethod(
    PokedexServices.POKEMON_SERVICE,
    PokemonServiceMethods.GET_POKEMON_TYPES,
  )
  getPokemonTypes({
    limit,
    skip,
  }: pokedex.GetTypesOptions): Observable<pokedex.ResponsePokemonTypesDto> {
    return from(
      this.pokemonTypeService.getTypes({ pagination: { limit, skip } }),
    ).pipe(
      map(({ data, total }) =>
        this.paginationHelper.makePaginationResponse({
          data,
          total,
          limit,
          skip,
        }),
      ),
    );
  }
}
