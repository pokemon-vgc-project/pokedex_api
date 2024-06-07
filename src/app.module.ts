import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthCheckModule } from './health_check/health_check.module';

@Module({
  imports: [ConfigModule, HealthCheckModule],
})
export class AppModule {}
