import { Global, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PaginationModule } from './pagination/pagination.module';
import { SortHelper } from './sort/helpers/sort.helper';

@Global()
@Module({
  imports: [PrismaModule, PaginationModule, SortHelper],
  exports: [PrismaModule, PaginationModule, SortHelper],
})
export class InfraModule {}
