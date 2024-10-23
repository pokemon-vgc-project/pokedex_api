import { Test, TestingModule } from '@nestjs/testing';
import { GetSortData, SortHelper } from './sort.helper';

const makeSut = ({ name, order }: Partial<GetSortData> = {}): GetSortData => {
  return {
    name: name || 'name',
    order: order || 'asc',
  };
};

describe('SortHelper', () => {
  let sortHelper: SortHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SortHelper],
    }).compile();

    sortHelper = module.get(SortHelper);
  });

  describe('makeSortData', () => {
    it('should return the sort dto without subparameter and asc order', () => {
      const sut = makeSut();
      const result = sortHelper.makeSortData(sut);

      expect(result.name).toEqual('name');
      expect(result.subparameter).toBeUndefined();
      expect(result.order).toEqual('asc');
    });

    it('should return the sort dto with subparameter and desc order', () => {
      const sut = makeSut({ name: 'nameprop.subname', order: 'desc' });
      const result = sortHelper.makeSortData(sut);

      expect(result.name).toEqual('nameprop');
      expect(result.subparameter).toEqual('subname');
      expect(result.order).toEqual('desc');
    });

    it('should return asc as default order', () => {
      const sut = makeSut({ order: 'test' });
      const result = sortHelper.makeSortData(sut);

      expect(result.order).toEqual('asc');
    });
  });
});
