import { SortDto } from '../models/sort.model';

export interface GetSortData {
  name: string;
  order: string;
}

interface GetNameAndSubparameterReturn {
  name: string;
  subparameter?: string;
}

export class SortHelper {
  makeSortData({ name, order }: GetSortData): SortDto {
    return {
      ...this.getNameAndSubparameter(name),
      order: this.getOrder(order),
    };
  }

  private getOrder(order: string): 'asc' | 'desc' {
    return order === 'desc' ? 'desc' : 'asc';
  }

  private getNameAndSubparameter(data: string): GetNameAndSubparameterReturn {
    const [name, subparameter] = data.split('.');
    return { name, subparameter };
  }
}
