import { Global, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PaginationModule } from './pagination/pagination.module';

@Global()
@Module({
  imports: [PrismaModule, PaginationModule],
  exports: [PrismaModule, PaginationModule],
})
export class InfraModule {}
