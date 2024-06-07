import { ConfigLoaderAdapter } from './config_loader.interface';

export enum configLoaderEnum {
  HTTP = 'http',
}

const getConfig = (): ConfigLoaderAdapter => ({
  http: {
    host: process.env.HTTP_HOST || '0.0.0.0',
    port: process.env.HTTP_PORT ? Number(process.env.HTTP_PORT) : 3000,
  },
});
export { getConfig };
