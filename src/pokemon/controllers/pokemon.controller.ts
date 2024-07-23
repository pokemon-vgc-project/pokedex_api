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
    pagination,
  }: pokedex.GetTypesOptions): Observable<pokedex.ResponsePokemonTypesDto> {
    return from(this.pokemonTypeService.getTypes({ pagination })).pipe(
      map(({ data, total }) =>
        this.paginationHelper.makePaginationResponse({
          data,
          total,
          limit: pagination?.limit,
          skip: pagination?.skip,
        }),
      ),
    );
  }

  @GrpcMethod(
    PokedexServices.POKEMON_SERVICE,
    PokemonServiceMethods.GET_POKEMON_FORMS,
  )
  getPokemonForms({
    pagination,
  }: pokedex.GetPokemonFormsOptions): Observable<pokedex.ResponsePokemonFormsDto> {
    return from(this.pokemonService.getFormes({ pagination })).pipe(
      map(({ data, total }) =>
        this.paginationHelper.makePaginationResponse({
          data,
          total,
          limit: pagination?.limit,
          skip: pagination?.skip,
        }),
      ),
    );
  }
}
