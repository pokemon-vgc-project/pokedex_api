import { Global, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PaginationModule } from './pagination/pagination.module';
import { SortModule } from './sort/sort.module';

@Global()
@Module({
  imports: [PrismaModule, PaginationModule, SortModule],
  exports: [PrismaModule, PaginationModule, SortModule],
})
export class InfraModule {}
