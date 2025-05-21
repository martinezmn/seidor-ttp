import { Test, TestingModule } from '@nestjs/testing';
import { ManejoController } from './manejo.controller';
import { ManejoService } from './manejo.service';
import { PrismaService } from '../../database/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AtribuirManejoDto } from './dto/atribuir-manejo.dto';
import { validate } from 'class-validator';

const mockPrismaService = {
  automovelMotorista: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  automovel: {
    findUnique: jest.fn(),
  },
  motorista: {
    findUnique: jest.fn(),
  },
};

const mockAutomovel = {
  id: 1,
  marca: 'Teste',
  cor: 'Vermelho',
  placa: 'ABC1234',
};

const mockMotorista = {
  id: 1,
  nome: 'Motorista Teste',
};

const mockAutomovelMotorista = {
  id: 1,
  automovelId: 1,
  motoristaId: 2,
  dataInicio: new Date('2025-04-01'),
  dataFim: null,
  motivo: 'Test',
};

describe('ManejoController', () => {
  let controller: ManejoController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ManejoController],
      providers: [
        ManejoService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    controller = app.get<ManejoController>(ManejoController);
    prisma = app.get<PrismaService>(PrismaService);
  });

  describe('list', () => {
    it('chama findMany incluindo automóveis e motoristas', async () => {
      const spyOnFindMany = jest
        .spyOn(prisma.automovelMotorista, 'findMany')
        .mockResolvedValueOnce([]);

      const result = await controller.list();

      expect(spyOnFindMany).toHaveBeenCalledWith({
        include: { automovel: true, motorista: true },
      });
      expect(result).toEqual([]);
    });
  });

  describe('atribuir', () => {
    it('atribui um automóvel a um motorista com sucesso', async () => {
      jest
        .spyOn(prisma.automovel, 'findUnique')
        .mockResolvedValueOnce(mockAutomovel);
      jest
        .spyOn(prisma.motorista, 'findUnique')
        .mockResolvedValueOnce(mockMotorista);
      jest
        .spyOn(prisma.automovelMotorista, 'findFirst')
        .mockResolvedValue(null);

      const spyOnCreate = jest
        .spyOn(prisma.automovelMotorista, 'create')
        .mockResolvedValueOnce(mockAutomovelMotorista);

      const result = await controller.atribuir(mockAutomovelMotorista);

      expect(result).toEqual(mockAutomovelMotorista);
      expect(spyOnCreate).toHaveBeenCalledWith({
        data: mockAutomovelMotorista,
      });
    });

    it('erro ao atribuir para automóvel ou motorista inexistentes', async () => {
      jest.spyOn(prisma.automovel, 'findUnique').mockResolvedValueOnce(null);
      jest.spyOn(prisma.motorista, 'findUnique').mockResolvedValueOnce(null);
      jest
        .spyOn(prisma.automovelMotorista, 'findFirst')
        .mockResolvedValue(mockAutomovelMotorista);

      try {
        await controller.atribuir(mockAutomovelMotorista);
      } catch (e) {
        const error = e as BadRequestException;
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.getResponse()['message']).toEqual([
          'Automóvel não encontrado.',
          'Motorista não encontrado.',
          'Automóvel já atribuído a outro motorista.',
          'Motorista já atribuído a outro automóvel.',
        ]);
      }
    });
  });

  describe('encerrar', () => {
    it('encerra uma atribuição de automóvel com sucesso', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2025-04-01'));

      jest
        .spyOn(prisma.automovelMotorista, 'findUnique')
        .mockResolvedValueOnce(mockAutomovelMotorista);

      const spyOnUpdate = jest
        .spyOn(prisma.automovelMotorista, 'update')
        .mockResolvedValueOnce(mockAutomovelMotorista);

      const result = await controller.encerrar(mockAutomovelMotorista.id);

      expect(result).toEqual(mockAutomovelMotorista);
      expect(spyOnUpdate).toHaveBeenCalledWith({
        where: { id: mockAutomovelMotorista.id },
        data: { dataFim: new Date('2025-04-01') },
      });
    });

    it('erro ao encerrar com id inexistente', async () => {
      jest
        .spyOn(prisma.automovelMotorista, 'findUnique')
        .mockResolvedValueOnce(null);

      const result = controller.encerrar(mockAutomovelMotorista.id);

      await expect(result).rejects.toThrow(BadRequestException);
    });
  });

  describe('dto transform', () => {
    it('transforma dataInicio de string para Date com sucesso', () => {
      const input = {
        ...mockAutomovelMotorista,
        dataInicio: '2025-01-01',
      };
      const dto = plainToInstance(AtribuirManejoDto, input);
      expect(dto.dataInicio instanceof Date).toBe(true);
    });

    it('erro ao tentar instanciar DTO com date inválido', async () => {
      const input = {
        ...mockAutomovelMotorista,
        dataInicio: '01/01/2025' as unknown as Date,
      };

      const dto = plainToInstance(AtribuirManejoDto, input);
      const errors = await validate(dto);

      expect(errors.length).toBe(1);
    });
  });
});
