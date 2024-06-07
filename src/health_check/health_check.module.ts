import { Module } from '@nestjs/common';
import { HealthCheckController } from './controllers/health_check.controller';

@Module({
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
