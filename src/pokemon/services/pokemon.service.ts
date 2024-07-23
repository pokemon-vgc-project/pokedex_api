import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import {
  PaginationData,
  PaginationOptions,
} from '../../infra/pagination/models/pagination.model';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { FilterNumberOptions } from '../../domain/shared/filters.interface';
import { Sort } from '../../domain/shared/sort.interface';
import { pokedex } from '../../domain/proto/@pokemon-vgc-project/lib-proto/proto/pokedex';
import { convertPokemonDbIntoDto } from '../mappers/pokemon.mapper';
import { getNumberFilter } from 'src/shared/helpers/filter.helper';

interface GetFormsOptions {
  pagination?: PaginationOptions;
}

interface GetPokemonsFiltersOptions {
  pokemonNum?: FilterNumberOptions;
  heightm?: FilterNumberOptions;
  weightkg?: FilterNumberOptions;
  abilities?: number[];
  types?: number[];
  forms?: string[];
  name?: string;
}
interface GetPokemonsOptions {
  filters?: GetPokemonsFiltersOptions;
  sorts?: Sort[];
  pagination?: PaginationOptions;
}

@Injectable()
export class PokemonService {
  constructor(private readonly prismaService: PrismaService) {}

  async getFormes({
    pagination: { limit, skip } = {},
  }: GetFormsOptions = {}): Promise<PaginationData<string[]>> {
    const defaultQuery: Prisma.PokemonFindManyArgs<DefaultArgs> = {
      distinct: ['forme'],
      select: {
        forme: true,
      },
      where: {
        forme: {
          not: null,
        },
      },
    };

    const query: Prisma.PokemonFindManyArgs<DefaultArgs> = {
      ...defaultQuery,
      take: limit,
      skip,
      orderBy: { forme: 'asc' },
    };

    const [formes, formesTotal] = await this.prismaService.$transaction([
      this.prismaService.pokemon.findMany(query),
      this.prismaService.pokemon.findMany(defaultQuery),
    ]);

    return {
      data: formes.map((forme) => forme.forme as string),
      total: formesTotal.length,
    };
  }

  async getPokemons({
    pagination: { limit, skip } = {},
    filters = {},
  }: GetPokemonsOptions = {}): Promise<PaginationData<pokedex.PokemonDto[]>> {
    const where: Prisma.PokemonWhereInput = this.getPokemonsWhere(filters);
    const query: Prisma.PokemonFindManyArgs<DefaultArgs> = {
      where,
      include: {
        abilities: {
          include: {
            ability: true,
          },
        },
        pokemonBaseStats: true,
        types: true,
      },
      take: limit,
      skip,
    };
    const [pokemons, total] = await this.prismaService.$transaction([
      this.prismaService.pokemon.findMany(query),
      this.prismaService.pokemon.count({ where }),
    ]);
    return {
      data: pokemons.map(convertPokemonDbIntoDto),
      total: total,
    };
  }

  private getPokemonsWhere(
    filters: GetPokemonsFiltersOptions = {},
  ): Prisma.PokemonWhereInput {
    const where: Prisma.PokemonWhereInput = {};

    if (Array.isArray(filters.abilities) && filters.abilities.length) {
      where.abilities = {
        some: {
          abilityId: {
            in: filters.abilities,
          },
        },
      };
    }

    if (Array.isArray(filters.forms) && filters.forms.length) {
      where.forme = {
        in: filters.forms,
      };
    }

    if (filters.heightm && Object.keys(filters.heightm).length > 0) {
      where.heightm = getNumberFilter(filters.heightm);
    }

    return where;
  }
}
