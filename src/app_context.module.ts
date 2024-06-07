import { Module } from '@nestjs/common';
import { ConfigModule } from './setup/config/config.module';

@Module({
  imports: [ConfigModule],
})
export class AppContextModule {}
