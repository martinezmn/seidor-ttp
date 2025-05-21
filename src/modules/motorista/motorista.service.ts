import { BadRequestException, Injectable } from '@nestjs/common';
import { AddMotoristaDto } from './dto/add-motorista.dto';
import { PrismaService } from '../../database/prisma.service';
import { Motorista } from '@prisma/client';
import { EditMotoristaDto } from './dto/edit-motorista.dto';
import { ListMotoristaFiltroDto } from './dto/list-motorista-filtro.dto';

@Injectable()
export class MotoristaService {
  constructor(private readonly prisma: PrismaService) {}

  async listMotoristas(filtro?: ListMotoristaFiltroDto): Promise<Motorista[]> {
    return await this.prisma.motorista.findMany({ where: filtro });
  }

  async getMotorista(id: number): Promise<Motorista> {
    const motorista = await this.prisma.motorista.findUnique({ where: { id } });

    if (!motorista) {
      throw new BadRequestException(['Motorista não encontrado.']);
    }

    return motorista;
  }

  async addMotorista(dto: AddMotoristaDto): Promise<Motorista> {
    return await this.prisma.motorista.create({ data: dto });
  }

  async editMotorista(id: number, dto: EditMotoristaDto): Promise<Motorista> {
    await this.getMotorista(id);

    return await this.prisma.motorista.update({ where: { id }, data: dto });
  }

  async deleteMotorista(id: number): Promise<Motorista> {
    await this.getMotorista(id);

    return await this.prisma.motorista.delete({ where: { id } });
  }
}
