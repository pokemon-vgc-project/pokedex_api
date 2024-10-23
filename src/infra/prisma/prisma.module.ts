import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaSortHelper } from './helpers/prisma_sort.helper';

@Module({
  providers: [PrismaService, PrismaSortHelper],
  exports: [PrismaService, PrismaSortHelper],
})
export class PrismaModule {}
