import { INestMicroservice } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppContextModule } from '../app_context.module';
import { HttpSetup } from './config/config_loader.interface';
import { configLoaderEnum } from './config/config.loader';
import { AppModule } from '../app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const loadMicroservice = async (): Promise<INestMicroservice> => {
  // TODO: Remove when the following is fixed https://github.com/nestjs/nest/issues/2343
  const appContext =
    await NestFactory.createApplicationContext(AppContextModule);

  // Get the host env vars
  const configService = appContext.get<ConfigService>(ConfigService);
  const httpSetup = configService.get<HttpSetup>(configLoaderEnum.HTTP);

  if (!httpSetup) {
    throw new Error('error to find the httpSetup');
  }

  appContext.close();

  const protoPath = join(__dirname, '../domain/proto/pokedex.proto');

  // Setup the microservice
  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.GRPC,
      options: {
        url: `${httpSetup.host}:${httpSetup.port}`,
        package: 'pokedex',
        protoPath,
      },
    });
  return microservice;
};
