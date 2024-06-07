import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { getConfig } from './config.loader';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [getConfig],
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
