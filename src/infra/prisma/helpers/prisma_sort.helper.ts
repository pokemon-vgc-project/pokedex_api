import { Injectable } from '@nestjs/common';
import { SortDto } from '../../sort/models/sort.model';
import { PrismaOrderBy } from '../types/prisma.type';

export type HelperFn = (orderByDto: PrismaOrderBy, sortDto: SortDto) => void;

@Injectable()
export class PrismaSortHelper {
  makeOrderBy(
    helperFn: HelperFn,
    sortDtos?: SortDto[],
  ): PrismaOrderBy | undefined {
    const orderByDto: PrismaOrderBy = {};

    if (Array.isArray(sortDtos) && sortDtos.length) {
      sortDtos.forEach((sortDto) => helperFn(orderByDto, sortDto));
    }
    return Object.keys(orderByDto).length ? orderByDto : undefined;
  }
}
