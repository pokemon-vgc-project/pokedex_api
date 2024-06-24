import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { pokedex } from '../../domain/proto/pokedex';
import {
  PaginationOptions,
  PaginationData,
} from '../../infra/pagination/models/pagination.model';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

interface GetListOptions {
  pagination?: PaginationOptions;
}

@Injectable()
export class NatureService {
  constructor(private readonly prismaService: PrismaService) {}

  async getList({
    pagination: { limit, skip } = {},
  }: GetListOptions = {}): Promise<PaginationData<pokedex.NatureDto[]>> {
    const query: Prisma.NatureFindManyArgs<DefaultArgs> = {
      take: limit,
      skip,
    };

    const [natures, total] = await this.prismaService.$transaction([
      this.prismaService.nature.findMany(query),
      this.prismaService.nature.count(),
    ]);

    return {
      data: natures.map((nature) => ({
        id: nature.id,
        name: nature.name,
        increase: nature.increase ?? null,
        decrease: nature.decrease ?? null,
      })),
      total,
    };
  }
}
