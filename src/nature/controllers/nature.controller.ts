import { Observable, from, map } from 'rxjs';
import { pokedex } from '../../domain/proto/pokedex';
import { GrpcMethod } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { NatureService } from '../services/nature.service';

@Controller()
export class NatureController implements pokedex.NatureService {
  constructor(private readonly natureService: NatureService) {}

  @GrpcMethod('NatureService', 'GetNatures')
  getNatures(): Observable<pokedex.ResponseNatureDto> {
    return from(this.natureService.getList()).pipe(map((data) => ({ data })));
  }
}
