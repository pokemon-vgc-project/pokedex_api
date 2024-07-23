import { Prisma } from '@prisma/client';
import { pokedex } from '../../domain/proto/@pokemon-vgc-project/lib-proto/proto/pokedex';
export type Pokemon = Prisma.PokemonGetPayload<{
  include: {
    abilities: {
      include: {
        ability: true;
      };
    };
    pokemonBaseStats: true;
    types: true;
  };
}>;

type PokemonAbility = Prisma.PokemonAbilityGetPayload<{
  include: {
    ability: true;
  };
}>;

export const convertPokemonDbIntoDto = (pkm: Pokemon): pokedex.PokemonDto => {
  return {
    id: pkm.id,
    num: pkm.num,
    form: pkm.forme ?? undefined,
    heightm: pkm.heightm ?? undefined,
    weightkg: pkm.weightkg ?? undefined,
    baseSpeciesId: pkm.baseSpeciesId ?? undefined,
    baseStats: {
      hp: pkm.pokemonBaseStats?.hp,
      atk: pkm.pokemonBaseStats?.atk,
      def: pkm.pokemonBaseStats?.def,
      spa: pkm.pokemonBaseStats?.spa,
      spd: pkm.pokemonBaseStats?.spd,
      spe: pkm.pokemonBaseStats?.spe,
    },
    types: pkm.types.map((type) => type.name) ?? [],
    abilities: pkm.abilities.map(convertPokemonAbilityDbIntoDto) ?? [],
  };
};

const convertPokemonAbilityDbIntoDto = (
  pkmAbility: PokemonAbility,
): pokedex.PokemonAbility => ({
  id: pkmAbility.ability.id,
  name: pkmAbility.ability.name,
  description: pkmAbility.ability.description,
  type: pkmAbility.abilityType as string,
});
