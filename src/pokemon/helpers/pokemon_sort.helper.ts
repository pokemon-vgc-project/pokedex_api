import { HelperFn } from '../../infra/prisma/helpers/prisma_sort.helper';

export const pokemonSortHelperFn: HelperFn = (orderByDtos, { name, order }) => {
  if (name === 'pokemon_number') {
    orderByDtos.push({ num: order });
  } else if (name === 'pokemon_name') {
    orderByDtos.push({ name: order });
  } else if (name === 'pokemon_height') {
    orderByDtos.push({ heightm: order });
  } else if (name === 'pokemon_weight') {
    orderByDtos.push({ weightkg: order });
  }
};
