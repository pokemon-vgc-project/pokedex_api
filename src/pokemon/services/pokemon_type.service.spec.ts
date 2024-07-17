import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PokemonTypeService } from './pokemon_type.service';
import { PrismaClient } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../infra/prisma/prisma.service';

const makeSutTypes = () => {
  const allTypes = [
    {
      id: 1,
      name: 'name_str_1',
    },
    {
      id: 2,
      name: 'name_str_2',
    },
    {
      id: 3,
      name: 'name_str_3',
    },
  ];
  return allTypes;
};

describe('PokemonTypeService', () => {
  let pokemonTypeService: PokemonTypeService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonTypeService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    pokemonTypeService = module.get(PokemonTypeService);
  });

  describe('getTypes', () => {
    it("should return a pokemon's type list", async () => {
      const allTypes = makeSutTypes();

      prismaMock.$transaction.mockResolvedValueOnce([
        allTypes,
        allTypes.length,
      ]);

      const result = await pokemonTypeService.getTypes();
      expect(result.data).toEqual(allTypes);
      expect(result.total).toEqual(allTypes.length);
    });
  });
});
