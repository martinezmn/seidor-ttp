import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MotoristaService } from './motorista.service';
import { AddMotoristaDto } from './dto/add-motorista.dto';
import { EditMotoristaDto } from './dto/edit-motorista.dto';
import { ParseIntPipe } from '../../shared/parse-int.pipe';
import { ListMotoristaFiltroDto } from './dto/list-motorista-filtro.dto';

@Controller('motorista')
export class MotoristaController {
  constructor(private readonly motoristaService: MotoristaService) {}

  @Get()
  async list(@Query() filtro?: ListMotoristaFiltroDto) {
    return this.motoristaService.listMotoristas(filtro);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.motoristaService.getMotorista(id);
  }

  @Post()
  async add(@Body() dto: AddMotoristaDto) {
    return this.motoristaService.addMotorista(dto);
  }

  @Put(':id')
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditMotoristaDto,
  ) {
    if (!dto) {
      throw new BadRequestException(['O corpo da requisição está vazio.']);
    }
    return this.motoristaService.editMotorista(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.motoristaService.deleteMotorista(id);
  }
}
