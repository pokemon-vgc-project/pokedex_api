import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { pokedex } from '../../domain/proto/pokedex';
import { Observable, of } from 'rxjs';

@Controller()
export class HealthCheckController implements pokedex.HealthService {
  @GrpcMethod('HealthService', 'Check')
  check(): Observable<pokedex.HealthCheckDto> {
    const dto: pokedex.HealthCheckDto = { message: 'running' };
    return of(dto);
  }
}
