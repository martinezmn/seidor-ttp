import { Test, TestingModule } from '@nestjs/testing';
import { AutomovelController } from './automovel.controller';
import { AutomovelService } from './automovel.service';
import { PrismaService } from '../../database/prisma.service';
import { BadRequestException } from '@nestjs/common';

const mockPrismaService = {
  automovel: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

const mockAutomovel = {
  id: 1,
  marca: 'Teste',
  cor: 'Vermelho',
  placa: 'ABC1234',
};

describe('AutomovelController', () => {
  let controller: AutomovelController;
  let service: AutomovelService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AutomovelController],
      providers: [
        AutomovelService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    controller = app.get<AutomovelController>(AutomovelController);
    service = app.get<AutomovelService>(AutomovelService);
    prisma = app.get<PrismaService>(PrismaService);
  });

  describe('list', () => {
    it('chama findMany sem filtros', async () => {
      const spyOnFindMany = jest
        .spyOn(prisma.automovel, 'findMany')
        .mockResolvedValueOnce([]);

      const result = await controller.list();

      expect(spyOnFindMany).toHaveBeenCalledWith({ where: undefined });
      expect(result).toEqual([]);
    });

    it('chama findMany com filtros', async () => {
      const spyOnFindMany = jest
        .spyOn(prisma.automovel, 'findMany')
        .mockResolvedValueOnce([]);

      const filtros = { marca: 'Teste', modelo: 'Modelo Teste' };

      const result = await controller.list(filtros);

      expect(spyOnFindMany).toHaveBeenCalledWith({ where: filtros });
      expect(result).toEqual([]);
    });
  });

  describe('get', () => {
    it('busca automóvel por id', async () => {
      const spyOnFindUnique = jest
        .spyOn(prisma.automovel, 'findUnique')
        .mockResolvedValueOnce(mockAutomovel);

      const result = await controller.get(mockAutomovel.id);

      expect(spyOnFindUnique).toHaveBeenCalledWith({
        where: { id: mockAutomovel.id },
      });
      expect(result).toEqual(mockAutomovel);
    });

    it('erro ao buscar automóvel inexistente', async () => {
      const spyOnFindUnique = jest
        .spyOn(prisma.automovel, 'findUnique')
        .mockResolvedValueOnce(null);

      const result = controller.get(mockAutomovel.id);

      await expect(result).rejects.toThrow(BadRequestException);
      expect(spyOnFindUnique).toHaveBeenCalledWith({
        where: { id: mockAutomovel.id },
      });
    });
  });

  describe('add', () => {
    it('adiciona novo automóvel com sucesso', async () => {
      jest.spyOn(prisma.automovel, 'findUnique').mockResolvedValueOnce(null);

      const spyOnCreate = jest
        .spyOn(prisma.automovel, 'create')
        .mockResolvedValueOnce(mockAutomovel);

      const result = await controller.add(mockAutomovel);

      expect(result).toEqual(mockAutomovel);
      expect(spyOnCreate).toHaveBeenCalledWith({ data: mockAutomovel });
    });

    it('erro ao adicionar placa já existente', async () => {
      const spyOnFindUnique = jest
        .spyOn(prisma.automovel, 'findUnique')
        .mockResolvedValueOnce(mockAutomovel);

      const result = controller.add(mockAutomovel);

      await expect(result).rejects.toThrow(BadRequestException);
      expect(spyOnFindUnique).toHaveBeenCalledWith({
        where: { placa: mockAutomovel.placa },
      });
    });
  });

  describe('edit', () => {
    it('edita automóvel com sucesso', async () => {
      jest.spyOn(service, 'getAutomovel').mockResolvedValueOnce(mockAutomovel);
      jest.spyOn(prisma.automovel, 'findFirst').mockResolvedValueOnce(null);

      const spyOnUpdate = jest
        .spyOn(prisma.automovel, 'update')
        .mockResolvedValueOnce(mockAutomovel);

      const result = await controller.edit(mockAutomovel.id, mockAutomovel);

      expect(result).toEqual(mockAutomovel);
      expect(spyOnUpdate).toHaveBeenCalledWith({
        where: { id: mockAutomovel.id },
        data: mockAutomovel,
      });
    });

    it('erro ao editar automóvel para placa já existente', async () => {
      jest.spyOn(service, 'getAutomovel').mockResolvedValueOnce(mockAutomovel);

      const spyOnFindFirst = jest
        .spyOn(prisma.automovel, 'findFirst')
        .mockResolvedValueOnce(mockAutomovel);

      const result = controller.edit(mockAutomovel.id, mockAutomovel);

      await expect(result).rejects.toThrow(BadRequestException);
      expect(spyOnFindFirst).toHaveBeenCalledWith({
        where: { placa: mockAutomovel.placa, id: { not: mockAutomovel.id } },
      });
    });

    it('erro caso o body esteja vazio', async () => {
      const result = controller.edit(mockAutomovel.id, undefined!);
      await expect(result).rejects.toThrow(BadRequestException);
    });
  });

  describe('delete', () => {
    it('deleta automóvel com sucesso', async () => {
      jest.spyOn(service, 'getAutomovel').mockResolvedValueOnce(mockAutomovel);

      const spyOnDelete = jest
        .spyOn(prisma.automovel, 'delete')
        .mockResolvedValueOnce(mockAutomovel);

      const result = await controller.delete(mockAutomovel.id);

      expect(result).toEqual(mockAutomovel);
      expect(spyOnDelete).toHaveBeenCalledWith({
        where: { id: mockAutomovel.id },
      });
    });
  });
});
