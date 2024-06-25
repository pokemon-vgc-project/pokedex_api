import { Module } from '@nestjs/common';
import { PaginationHelper } from './helpers/pagination.helper';

@Module({
  providers: [PaginationHelper],
  exports: [PaginationHelper],
})
export class PaginationModule {}
