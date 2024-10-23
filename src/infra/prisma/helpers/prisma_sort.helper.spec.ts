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
    it('should returns an object array with age prop', () => {
      const sut: SortDto[] = [
        {
          name: 'age',
          order: 'desc',
        },
      ];

      const fn: HelperFn = (orderByDtos, { name, order }) => {
        if (name === 'age') {
          orderByDtos.push({ age: order });
        }
      };

      const result = prismaSortHelper.makeOrderBy(fn, sut);

      expect(result).not.toBeUndefined();
      if (result) {
        expect(result[0]).toHaveProperty('age');
        expect(result[0].age).toEqual('desc');
      }
    });

    it('should return multiple filters', () => {
      const sut: SortDto[] = [
        {
          name: 'age',
          order: 'desc',
        },
        {
          name: 'name',
          order: 'asc',
        },
      ];

      const fn: HelperFn = (orderByDtos, { name, order }) => {
        if (name === 'age') {
          orderByDtos.push({ age: order });
        } else if (name === 'name') {
          orderByDtos.push({ name: order });
        }
      };

      const result = prismaSortHelper.makeOrderBy(fn, sut);

      expect(result).not.toBeUndefined();
      if (result) {
        expect(result.length).toEqual(2);
        expect(result[0]).toHaveProperty('age');
        expect(result[0].age).toEqual('desc');
        expect(result[1]).toHaveProperty('name');
        expect(result[1].name).toEqual('asc');
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

      const fn: HelperFn = (orderByDtos, { name, order, subparameter }) => {
        if (name === 'stats' && subparameter === 'atk') {
          orderByDtos.push({ atk: order });
        }
      };

      const result = prismaSortHelper.makeOrderBy(fn, sut);

      expect(result).not.toBeUndefined();
      if (result) {
        expect(result[0]).toHaveProperty('atk');
        expect(result[0].atk).toEqual('asc');
      }
    });

    it('should returns undefined when not find the prop', () => {
      const sut: SortDto[] = [
        {
          name: 'age',
          order: 'desc',
        },
      ];

      const fn: HelperFn = (orderByDtos, { name, order }) => {
        if (name === 'atk') {
          orderByDtos.push({ atk: order });
        }
      };

      const result = prismaSortHelper.makeOrderBy(fn, sut);
      expect(result).toBeUndefined();
    });

    it('should returns undefined when the sortDto list is undefined', () => {
      const fn: HelperFn = (orderByDtos, { name, order }) => {
        if (name === 'atk') {
          orderByDtos.push({ atk: order });
        }
      };

      const result = prismaSortHelper.makeOrderBy(fn, undefined);
      expect(result).toBeUndefined();
    });
  });
});
