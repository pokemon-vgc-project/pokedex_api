import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import {
  PaginationData,
  PaginationOptions,
} from '../../infra/pagination/models/pagination.model';
import { PrismaService } from '../../infra/prisma/prisma.service';

interface GetFormsOptions {
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
}
