import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { pokedex } from '../../domain/proto/pokedex';

@Injectable()
export class NatureService {
  constructor(private readonly prismaService: PrismaService) {}

  async getList(): Promise<pokedex.NatureDto[]> {
    const natures = await this.prismaService.nature.findMany();
    return natures.map((nature) => ({
      id: nature.id,
      name: nature.name,
      increase: nature.increase ? { value: nature.increase } : null,
      decrease: nature.decrease ? { value: nature.decrease } : null,
    }));
  }
}
