export interface PaginationOptions {
  limit?: number;
  skip?: number;
}

export interface PaginationData<Data> {
  data: Data;
  total: number;
}

export interface PaginationMeta {
  page: number;
  skip: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PaginationDto<Data> {
  data: Data;
  meta: PaginationMeta;
}
