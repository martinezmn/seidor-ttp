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
import { AutomovelService } from './automovel.service';
import { AddAutomovelDto } from './dto/add-automovel.dto';
import { EditAutomovelDto } from './dto/edit-automovel.dto';
import { ParseIntPipe } from '../../shared/parse-int.pipe';
import { ListAutomovelFiltroDto } from './dto/list-automovel-filtro.dto';

@Controller('automovel')
export class AutomovelController {
  constructor(private readonly automovelService: AutomovelService) {}

  @Get()
  async list(@Query() filtro?: ListAutomovelFiltroDto) {
    return this.automovelService.listAutomoveis(filtro);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.automovelService.getAutomovel(id);
  }

  @Post()
  async add(@Body() dto: AddAutomovelDto) {
    return this.automovelService.addAutomovel(dto);
  }

  @Put(':id')
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditAutomovelDto,
  ) {
    if (!dto) {
      throw new BadRequestException(['O corpo da requisição está vazio.']);
    }
    return this.automovelService.editAutomovel(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.automovelService.deleteAutomovel(id);
  }
}
