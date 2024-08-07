import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import {
  PaginationData,
  PaginationOptions,
} from '../../infra/pagination/models/pagination.model';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { pokedex } from 'src/domain/proto/@pokemon-vgc-project/lib-proto/proto/pokedex';

interface GetTypesOptions {
  pagination?: PaginationOptions;
}

@Injectable()
export class PokemonTypeService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTypes({
    pagination: { limit, skip } = {},
  }: GetTypesOptions = {}): Promise<PaginationData<pokedex.PokemonTypeDto[]>> {
    const where: Prisma.TypeWhereInput = {
      name: {
        not: 'Stellar',
      },
    };

    const query: Prisma.TypeFindManyArgs<DefaultArgs> = {
      take: limit,
      skip,
      where,
      orderBy: { name: 'asc' },
    };

    const [types, total] = await this.prismaService.$transaction([
      this.prismaService.type.findMany(query),
      this.prismaService.type.count({ where }),
    ]);

    const result: PaginationData<pokedex.PokemonTypeDto[]> = {
      data: types.map((type) => ({
        id: type.id,
        name: type.name,
      })),
      total,
    };
    return result;
  }
}
