import { Test, TestingModule } from '@nestjs/testing';
import { HelperFn, PrismaSortHelper } from './prisma_sort.helper';
import { SortDto } from '../../sort/models/sort.model';

describe('PrismaSortHelper', () => {
  let prismaSortHelper: PrismaSortHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaSortHelper],
    }).compile();

    prismaSortHelper = module.get(PrismaSortHelper);
  });

  describe('makeOrderBy', () => {
    it('should returns an object with age prop', () => {
      const sut: SortDto[] = [
        {
          name: 'age',
          order: 'desc',
        },
      ];

      const fn: HelperFn = (orderByDto, { name, order }) => {
        if (name === 'age') {
          orderByDto.age = order;
        }
      };

      const result = prismaSortHelper.makeOrderBy(fn, sut);

      expect(result).not.toBeUndefined();
      if (result) {
        expect(result).toHaveProperty('age');
        expect(result.age).toEqual('desc');
      }
    });

    it('should use name and subparameter to find the atk prop', () => {
      const sut: SortDto[] = [
        {
          name: 'stats',
          subparameter: 'atk',
          order: 'asc',
        },
      ];

      const fn: HelperFn = (orderByDto, { name, order, subparameter }) => {
        if (name === 'stats' && subparameter === 'atk') {
          orderByDto.atk = order;
        }
      };

      const result = prismaSortHelper.makeOrderBy(fn, sut);

      expect(result).not.toBeUndefined();
      if (result) {
        expect(result).toHaveProperty('atk');
        expect(result.atk).toEqual('asc');
      }
    });

    it('should returns undefined when not find the prop', () => {
      const sut: SortDto[] = [
        {
          name: 'age',
          order: 'desc',
        },
      ];

      const fn: HelperFn = (orderByDto, { name, order }) => {
        if (name === 'atk') {
          orderByDto.atk = order;
        }
      };

      const result = prismaSortHelper.makeOrderBy(fn, sut);
      expect(result).toBeUndefined();
    });

    it('should returns undefined when the sortDto list is undefined', () => {
      const fn: HelperFn = (orderByDto, { name, order }) => {
        if (name === 'atk') {
          orderByDto.atk = order;
        }
      };

      const result = prismaSortHelper.makeOrderBy(fn, undefined);
      expect(result).toBeUndefined();
    });
  });
});
