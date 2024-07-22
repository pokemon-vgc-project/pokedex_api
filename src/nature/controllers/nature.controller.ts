import { Observable, from, map } from 'rxjs';
import { GrpcMethod } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { NatureService } from '../services/nature.service';
import { PaginationHelper } from 'src/infra/pagination/helpers/pagination.helper';
import {
  NatureServiceMethods,
  PokedexServices,
} from '@pokemon-vgc-project/lib-proto';
import { pokedex } from 'src/domain/proto/@pokemon-vgc-project/lib-proto/proto/pokedex';

@Controller()
export class NatureController implements pokedex.NatureService {
  constructor(
    private readonly natureService: NatureService,
    private readonly paginationHelper: PaginationHelper,
  ) {}

  @GrpcMethod(PokedexServices.NATURE_SERVICE, NatureServiceMethods.GET_NATURES)
  getNatures({
    limit,
    skip,
  }: pokedex.GetNaturesOptions): Observable<pokedex.ResponseNatureDto> {
    return from(
      this.natureService.getList({
        pagination: {
          limit,
          skip,
        },
      }),
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
