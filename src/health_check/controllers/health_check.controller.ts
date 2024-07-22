import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';
import {
  HealthServiceMethods,
  SharedServices,
} from '@pokemon-vgc-project/lib-proto';
import { pokedex } from 'src/domain/proto/@pokemon-vgc-project/lib-proto/proto/pokedex';

@Controller()
export class HealthCheckController implements pokedex.HealthService {
  @GrpcMethod(SharedServices.HEALTH_SERVICE, HealthServiceMethods.CHECK)
  check(): Observable<pokedex.HealthCheckDto> {
    const dto: pokedex.HealthCheckDto = { message: 'running' };
    return of(dto);
  }
}
