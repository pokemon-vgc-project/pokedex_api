import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { pokedex } from '../../domain/proto/pokedex';
import { Observable, of } from 'rxjs';
import {
  HealthServiceMethods,
  SharedServices,
} from '@pokemon-vgc-project/lib-proto';

@Controller()
export class HealthCheckController implements pokedex.HealthService {
  @GrpcMethod(SharedServices.HEALTH_SERVICE, HealthServiceMethods.CHECK)
  check(): Observable<pokedex.HealthCheckDto> {
    const dto: pokedex.HealthCheckDto = { message: 'running' };
    return of(dto);
  }
}
