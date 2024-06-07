import { loadMicroservice } from './setup/microservice.loader';

async function bootstrap() {
  const app = await loadMicroservice();
  await app.listen();
}
bootstrap();
