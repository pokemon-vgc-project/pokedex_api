import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { from, map, Observable } from 'rxjs';
import { PokemonTypeService } from '../services/pokemon_type.service';
import { PaginationHelper } from 'src/infra/pagination/helpers/pagination.helper';
import {
  PokedexServices,
  PokemonServiceMethods,
} from '@pokemon-vgc-project/lib-proto';
import { pokedex } from 'src/domain/proto/@pokemon-vgc-project/lib-proto/proto/pokedex';
import { PokemonService } from '../services/pokemon.service';

@Controller()
export class PokemonController implements pokedex.PokemonService {
  constructor(
    private readonly pokemonTypeService: PokemonTypeService,
    private readonly pokemonService: PokemonService,
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

  @GrpcMethod(
    PokedexServices.POKEMON_SERVICE,
    PokemonServiceMethods.GET_POKEMON_FORMS,
  )
  getPokemonForms({
    limit,
    skip,
  }: pokedex.GetPokemonFormsOptions): Observable<pokedex.ResponsePokemonFormsDto> {
    return from(
      this.pokemonService.getFormes({ pagination: { limit, skip } }),
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
