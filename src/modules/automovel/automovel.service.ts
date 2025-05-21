import { BadRequestException, Injectable } from '@nestjs/common';
import { AddAutomovelDto } from './dto/add-automovel.dto';
import { PrismaService } from '../../database/prisma.service';
import { Automovel } from '@prisma/client';
import { EditAutomovelDto } from './dto/edit-automovel.dto';
import { ListAutomovelFiltroDto } from './dto/list-automovel-filtro.dto';

@Injectable()
export class AutomovelService {
  constructor(private readonly prisma: PrismaService) {}

  async listAutomoveis(filtro?: ListAutomovelFiltroDto): Promise<Automovel[]> {
    return await this.prisma.automovel.findMany({ where: filtro });
  }

  async getAutomovel(id: number): Promise<Automovel> {
    const automovel = await this.prisma.automovel.findUnique({ where: { id } });

    if (!automovel) {
      throw new BadRequestException(['Automóvel não encontrado.']);
    }

    return automovel;
  }

  async addAutomovel(dto: AddAutomovelDto): Promise<Automovel> {
    const automovel = await this.prisma.automovel.findUnique({
      where: { placa: dto.placa },
    });

    if (automovel) {
      throw new BadRequestException(['Essa placa já está cadastrada.']);
    }

    return await this.prisma.automovel.create({ data: dto });
  }

  async editAutomovel(id: number, dto: EditAutomovelDto): Promise<Automovel> {
    await this.getAutomovel(id);

    const automovel = await this.prisma.automovel.findFirst({
      where: { placa: dto.placa, id: { not: id } },
    });

    if (automovel) {
      throw new BadRequestException(['Essa placa já está cadastrada.']);
    }

    return await this.prisma.automovel.update({ where: { id }, data: dto });
  }

  async deleteAutomovel(id: number): Promise<Automovel> {
    await this.getAutomovel(id);

    return await this.prisma.automovel.delete({ where: { id } });
  }
}
