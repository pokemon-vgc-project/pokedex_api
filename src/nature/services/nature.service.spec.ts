import { Test, TestingModule } from '@nestjs/testing';
import { NatureService } from './nature.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PokemonStatusEnum, PrismaClient } from '@prisma/client';
import { PrismaService } from '../../infra/prisma/prisma.service';

const makeSutNatures = () => {
  const allNatures = [
    {
      id: 1,
      name: 'name_str_1',
      increase: PokemonStatusEnum.ATK,
      decrease: PokemonStatusEnum.DEF,
    },
    {
      id: 2,
      name: 'name_str_2',
      increase: PokemonStatusEnum.ATK,
      decrease: null,
    },
    {
      id: 3,
      name: 'name_str_3',
      increase: null,
      decrease: PokemonStatusEnum.DEF,
    },
    {
      id: 4,
      name: 'name_str_4',
      increase: null,
      decrease: null,
    },
  ];
  return allNatures;
};

describe('NatureService', () => {
  let natureService: NatureService;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NatureService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    natureService = module.get(NatureService);
  });

  describe('getList', () => {
    it('should return a nature list', async () => {
      const allNatures = makeSutNatures();

      prismaMock.$transaction.mockResolvedValueOnce([
        allNatures,
        allNatures.length,
      ]);

      const result = await natureService.getList();
      expect(result.data).toEqual(allNatures);
      expect(result.total).toEqual(allNatures.length);
    });
  });
});
