import { HelperFn } from '../../infra/prisma/helpers/prisma_sort.helper';

export const pokemonSortHelperFn: HelperFn = (
  orderByDtos,
  { name, order, subparameter },
) => {
  if (name === 'pokemon_number') {
    orderByDtos.push({ num: order });
  } else if (name === 'pokemon_name') {
    orderByDtos.push({ name: order });
  } else if (name === 'pokemon_height') {
    orderByDtos.push({ heightm: order });
  } else if (name === 'pokemon_weight') {
    orderByDtos.push({ weightkg: order });
  } else if (
    name === 'pokemon_base_stats' &&
    subparameter &&
    ['hp', 'atk', 'def', 'spa', 'spd', 'spe'].includes(subparameter)
  ) {
    const pokemonBaseStats = {};
    pokemonBaseStats[subparameter] = order;
    orderByDtos.push({ pokemonBaseStats });
  }
};
