import { Module } from '@nestjs/common';
import { SortHelper } from './helpers/sort.helper';

@Module({
  providers: [SortHelper],
  exports: [SortHelper],
})
export class SortModule {}
