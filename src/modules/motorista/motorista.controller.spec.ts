import { Test, TestingModule } from '@nestjs/testing';
import { MotoristaController } from './motorista.controller';
import { MotoristaService } from './motorista.service';
import { PrismaService } from '../../database/prisma.service';
import { BadRequestException } from '@nestjs/common';

const mockPrismaService = {
  motorista: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

const mockMotorista = {
  id: 1,
  nome: 'Motorista Teste',
};

describe('MotoristaController', () => {
  let controller: MotoristaController;
  let service: MotoristaService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MotoristaController],
      providers: [
        MotoristaService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    controller = app.get<MotoristaController>(MotoristaController);
    service = app.get<MotoristaService>(MotoristaService);
    prisma = app.get<PrismaService>(PrismaService);
  });

  describe('list', () => {
    it('chama findMany sem filtros', async () => {
      const spyOnFindMany = jest
        .spyOn(prisma.motorista, 'findMany')
        .mockResolvedValueOnce([]);

      const result = await controller.list();

      expect(spyOnFindMany).toHaveBeenCalledWith({ where: undefined });
      expect(result).toEqual([]);
    });

    it('chama findMany com filtros', async () => {
      const spyOnFindMany = jest
        .spyOn(prisma.motorista, 'findMany')
        .mockResolvedValueOnce([]);

      const filtros = { nome: 'Motorista Teste' };

      const result = await controller.list(filtros);

      expect(spyOnFindMany).toHaveBeenCalledWith({ where: filtros });
      expect(result).toEqual([]);
    });
  });

  describe('get', () => {
    it('busca motorista por id', async () => {
      const spyOnFindUnique = jest
        .spyOn(prisma.motorista, 'findUnique')
        .mockResolvedValueOnce(mockMotorista);

      const result = await controller.get(mockMotorista.id);

      expect(spyOnFindUnique).toHaveBeenCalledWith({
        where: { id: mockMotorista.id },
      });
      expect(result).toEqual(mockMotorista);
    });

    it('erro ao buscar motorista inexistente', async () => {
      const spyOnFindUnique = jest
        .spyOn(prisma.motorista, 'findUnique')
        .mockResolvedValueOnce(null);

      const result = controller.get(mockMotorista.id);

      await expect(result).rejects.toThrow(BadRequestException);
      expect(spyOnFindUnique).toHaveBeenCalledWith({
        where: { id: mockMotorista.id },
      });
    });
  });

  describe('add', () => {
    it('adiciona novo motorista com sucesso', async () => {
      jest.spyOn(prisma.motorista, 'findUnique').mockResolvedValueOnce(null);

      const spyOnCreate = jest
        .spyOn(prisma.motorista, 'create')
        .mockResolvedValueOnce(mockMotorista);

      const result = await controller.add(mockMotorista);

      expect(result).toEqual(mockMotorista);
      expect(spyOnCreate).toHaveBeenCalledWith({ data: mockMotorista });
    });
  });

  describe('edit', () => {
    it('edita motorista com sucesso', async () => {
      jest.spyOn(service, 'getMotorista').mockResolvedValueOnce(mockMotorista);

      const spyOnUpdate = jest
        .spyOn(prisma.motorista, 'update')
        .mockResolvedValueOnce(mockMotorista);

      const result = await controller.edit(mockMotorista.id, mockMotorista);

      expect(result).toEqual(mockMotorista);
      expect(spyOnUpdate).toHaveBeenCalledWith({
        where: { id: mockMotorista.id },
        data: mockMotorista,
      });
    });

    it('erro caso o body esteja vazio', async () => {
      const result = controller.edit(mockMotorista.id, undefined!);
      await expect(result).rejects.toThrow(BadRequestException);
    });
  });

  describe('delete', () => {
    it('deleta motorista com sucesso', async () => {
      jest.spyOn(service, 'getMotorista').mockResolvedValueOnce(mockMotorista);

      const spyOnDelete = jest
        .spyOn(prisma.motorista, 'delete')
        .mockResolvedValueOnce(mockMotorista);

      const result = await controller.delete(mockMotorista.id);

      expect(result).toEqual(mockMotorista);
      expect(spyOnDelete).toHaveBeenCalledWith({
        where: { id: mockMotorista.id },
      });
    });
  });
});
