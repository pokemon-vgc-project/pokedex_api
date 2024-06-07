import { Module } from '@nestjs/common';
import { NatureController } from './controllers/nature.controller';
import { NatureService } from './services/nature.service';

@Module({
  controllers: [NatureController],
  providers: [NatureService],
})
export class NatureModule {}
