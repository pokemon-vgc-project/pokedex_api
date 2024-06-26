import { Test, TestingModule } from '@nestjs/testing';
import { MakePaginationOptions, PaginationHelper } from './pagination.helper';

const makeSut = <Data>({
  total,
  limit,
  skip,
  data,
}: Partial<MakePaginationOptions<Data>> = {}): MakePaginationOptions<Data> => {
  return {
    data: data ?? ([] as Data),
    total: total ?? 10,
    limit,
    skip,
  };
};

describe('PaginationHelper', () => {
  let paginationHelper: PaginationHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaginationHelper],
    }).compile();

    paginationHelper = module.get(PaginationHelper);
  });

  describe('makePaginationResponse', () => {
    it('should the options.data be the data', () => {
      const sut = makeSut({ data: [1, 2, 3, 4] });
      const { data } = paginationHelper.makePaginationResponse(sut);

      expect(data).toEqual(data);
    });

    it('should return the default meta value when it does not have the skip and limit', () => {
      const sut = makeSut({ total: 10, limit: undefined, skip: undefined });
      const { meta } = paginationHelper.makePaginationResponse(sut);

      expect(meta.page).toEqual(1);
      expect(meta.pageCount).toEqual(1);
      expect(meta.itemCount).toEqual(sut.total);
      expect(meta.limit).toEqual(sut.total);
      expect(meta.skip).toEqual(0);
      expect(meta.hasPreviousPage).toBeFalsy();
      expect(meta.hasNextPage).toBeFalsy();
    });

    it('should be on the second page with a total of 10 pages', () => {
      const sut = makeSut({
        total: 90,
        limit: 9,
        skip: 13,
      });

      const { meta } = paginationHelper.makePaginationResponse(sut);

      expect(meta.page).toEqual(2);
      expect(meta.pageCount).toEqual(10);
      expect(meta.itemCount).toEqual(sut.total);
      expect(meta.limit).toEqual(sut.limit);
      expect(meta.skip).toEqual(sut.skip);
      expect(meta.hasPreviousPage).toBeTruthy();
      expect(meta.hasNextPage).toBeTruthy();
    });

    it('should be on the first page with a total of 11 pages', () => {
      const sut = makeSut({
        total: 91,
        limit: 9,
        skip: 0,
      });

      const { meta } = paginationHelper.makePaginationResponse(sut);

      expect(meta.page).toEqual(1);
      expect(meta.pageCount).toEqual(11);
      expect(meta.itemCount).toEqual(sut.total);
      expect(meta.limit).toEqual(sut.limit);
      expect(meta.skip).toEqual(sut.skip);
      expect(meta.hasPreviousPage).toBeFalsy();
      expect(meta.hasNextPage).toBeTruthy();
    });

    it('should be on the last page with a total of 9 pages', () => {
      const sut = makeSut({
        total: 81,
        limit: 10,
        skip: 80,
      });

      const { meta } = paginationHelper.makePaginationResponse(sut);

      expect(meta.page).toEqual(9);
      expect(meta.pageCount).toEqual(9);
      expect(meta.itemCount).toEqual(sut.total);
      expect(meta.limit).toEqual(sut.limit);
      expect(meta.skip).toEqual(sut.skip);
      expect(meta.hasPreviousPage).toBeTruthy();
      expect(meta.hasNextPage).toBeFalsy();
    });

    it('should the skip value be zero when only the skip is undefined', () => {
      const sut = makeSut({ skip: undefined });

      const { meta } = paginationHelper.makePaginationResponse(sut);

      expect(meta.skip).toEqual(0);
    });

    it('should the skip value be zero when only the skip is undefined', () => {
      const sut = makeSut({ skip: undefined });

      const { meta } = paginationHelper.makePaginationResponse(sut);

      expect(meta.skip).toEqual(0);
    });

    it('should the limit value be the total when only the limit is undefined', () => {
      const sut = makeSut({ limit: undefined, total: 50 });

      const { meta } = paginationHelper.makePaginationResponse(sut);

      expect(meta.limit).toEqual(sut.total);
    });

    it('should the itemCount value be the total', () => {
      const sut = makeSut({ limit: undefined, total: 27 });

      const { meta } = paginationHelper.makePaginationResponse(sut);

      expect(meta.itemCount).toEqual(sut.total);
    });
  });
});
