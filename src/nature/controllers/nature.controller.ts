import { Observable, from, map } from 'rxjs';
import { pokedex } from '../../domain/proto/pokedex';
import { GrpcMethod } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { NatureService } from '../services/nature.service';
import { PaginationHelper } from 'src/infra/pagination/helpers/pagination.helper';

@Controller()
export class NatureController implements pokedex.NatureService {
  constructor(
    private readonly natureService: NatureService,
    private readonly paginationHelper: PaginationHelper,
  ) {}

  @GrpcMethod('NatureService', 'GetNatures')
  getNatures(): Observable<pokedex.ResponseNatureDto> {
    return from(this.natureService.getList()).pipe(
      map(({ data, total }) =>
        this.paginationHelper.makePaginationResponse({
          data,
          total,
        }),
      ),
    );
  }
}
