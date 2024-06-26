import { Injectable } from '@nestjs/common';
import {
  PaginationData,
  PaginationDto,
  PaginationMeta,
} from '../models/pagination.model';

export interface MakePaginationOptions<Data> extends PaginationData<Data> {
  limit?: number;
  skip?: number;
}

type MakePaginationMetaOptions = Omit<MakePaginationOptions<unknown>, 'data'>;

@Injectable()
export class PaginationHelper {
  makePaginationResponse<Data>(
    options: MakePaginationOptions<Data>,
  ): PaginationDto<Data> {
    const { data, ...metaOptions } = options;
    return {
      data,
      meta: this.makePaginationMeta(metaOptions),
    };
  }

  private makePaginationMeta({
    limit,
    skip,
    total,
  }: MakePaginationMetaOptions): PaginationMeta {
    const limitValue = limit ?? total;
    const skipValue = skip ?? 0;
    const pageCount = Math.ceil(total / limitValue);
    const currentPage = this.calculateCurrentPage(skipValue, limitValue);

    return {
      page: currentPage,
      pageCount,
      itemCount: total,
      skip: skipValue,
      limit: limitValue,
      hasNextPage: currentPage < pageCount,
      hasPreviousPage: currentPage > 1,
    };
  }

  private calculateCurrentPage(skip: number, limit: number): number {
    if (skip === 0) return 1;

    return Math.floor(skip / limit) + 1;
  }
}
