import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PokemonService } from './pokemon.service';
import { PrismaClient } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../infra/prisma/prisma.service';

const makeSutPokemonFormes = () => {
  return [
    { forme: 'form_1' },
    { forme: 'form_2' },
    { forme: 'form_3' },
    { forme: 'form_4' },
    { forme: 'form_5' },
  ];
};

describe('PokemonService', () => {
  let pokemonService: PokemonService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    pokemonService = module.get(PokemonService);
  });

  describe('getFormes', () => {
    it("should return a pokemon's formes", async () => {
      const allForme = makeSutPokemonFormes();
      const expectData = allForme.map(({ forme }) => forme);

      prismaMock.$transaction.mockResolvedValueOnce([allForme, allForme]);

      const result = await pokemonService.getFormes();
      expect(result.data).toEqual(expectData);
      expect(result.total).toEqual(allForme.length);
    });
  });
});
