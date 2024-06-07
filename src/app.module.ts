import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthCheckModule } from './health_check/health_check.module';
import { InfraModule } from './infra/infra.module';
import { NatureModule } from './nature/nature.module';

@Module({
  imports: [ConfigModule, InfraModule, HealthCheckModule, NatureModule],
})
export class AppModule {}
