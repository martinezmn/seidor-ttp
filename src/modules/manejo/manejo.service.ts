import { BadRequestException, Injectable } from '@nestjs/common';
import { AtribuirManejoDto } from './dto/atribuir-manejo.dto';
import { PrismaService } from '../../database/prisma.service';
import { AutomovelMotorista } from '@prisma/client';

@Injectable()
export class ManejoService {
  constructor(private readonly prisma: PrismaService) {}

  async listAtribuidos(): Promise<AutomovelMotorista[]> {
    return await this.prisma.automovelMotorista.findMany({
      include: { automovel: true, motorista: true },
    });
  }

  async atribuir(dto: AtribuirManejoDto): Promise<AutomovelMotorista> {
    const [automovel, motorista, automovelAtribuido, motoristaAtribuido] =
      await Promise.all([
        this.prisma.automovel.findUnique({ where: { id: dto.automovelId } }),
        this.prisma.motorista.findUnique({ where: { id: dto.motoristaId } }),
        this.prisma.automovelMotorista.findFirst({
          where: { automovelId: dto.automovelId, dataFim: null },
        }),
        this.prisma.automovelMotorista.findFirst({
          where: { motoristaId: dto.motoristaId, dataFim: null },
        }),
      ]);

    const error: string[] = [];

    if (!automovel) {
      error.push('Automóvel não encontrado.');
    }
    if (!motorista) {
      error.push('Motorista não encontrado.');
    }
    if (automovelAtribuido) {
      error.push('Automóvel já atribuído a outro motorista.');
    }
    if (motoristaAtribuido) {
      error.push('Motorista já atribuído a outro automóvel.');
    }

    if (error.length) {
      throw new BadRequestException(error);
    }

    return await this.prisma.automovelMotorista.create({ data: dto });
  }

  async encerrar(id: number): Promise<AutomovelMotorista> {
    const automovelMotorista = await this.prisma.automovelMotorista.findUnique({
      where: { id },
    });

    if (!automovelMotorista) {
      throw new BadRequestException('Registro não encontrado.');
    }

    return await this.prisma.automovelMotorista.update({
      where: { id },
      data: { dataFim: new Date() },
    });
  }
}
