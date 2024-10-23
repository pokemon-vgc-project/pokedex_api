import { Injectable } from '@nestjs/common';
import { SortDto } from '../../sort/models/sort.model';
import { PrismaOrderBy } from '../types/prisma.type';

export type HelperFn = (orderByDtos: PrismaOrderBy[], sortDto: SortDto) => void;

@Injectable()
export class PrismaSortHelper {
  makeOrderBy(
    helperFn: HelperFn,
    sortDtos?: SortDto[],
  ): PrismaOrderBy[] | undefined {
    const orderByDtos: PrismaOrderBy[] = [];

    if (Array.isArray(sortDtos) && sortDtos.length) {
      sortDtos.forEach((sortDto) => helperFn(orderByDtos, sortDto));
    }
    return orderByDtos.length ? orderByDtos : undefined;
  }
}
