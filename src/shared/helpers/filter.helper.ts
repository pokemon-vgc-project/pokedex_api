import { FilterNumberOptions } from 'src/domain/shared/filters.interface';
import { getFloatNumberPattern } from './math.helper';

interface NumberFilter {
  gte?: number;
  lte?: number;
}

export const getNumberFilter = (
  filter?: FilterNumberOptions,
): undefined | number | NumberFilter => {
  if (!filter || Object.keys(filter).length < 1) return;
  if (Object.keys(filter).length < 2) {
    return filter.start
      ? getFloatNumberPattern(filter.start)
      : getFloatNumberPattern(filter.end as number);
  }
  return {
    gte: getFloatNumberPattern(filter.start as number),
    lte: getFloatNumberPattern(filter.end as number),
  };
};
