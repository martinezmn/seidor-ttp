import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ManejoService } from './manejo.service';
import { AtribuirManejoDto } from './dto/atribuir-manejo.dto';
import { ParseIntPipe } from '../../shared/parse-int.pipe';

@Controller('manejo')
export class ManejoController {
  constructor(private readonly manejoService: ManejoService) {}

  @Get()
  async list() {
    return this.manejoService.listAtribuidos();
  }

  @Post('atribuir')
  async atribuir(@Body() dto: AtribuirManejoDto) {
    return this.manejoService.atribuir(dto);
  }

  @Put('encerrar/:id')
  async encerrar(@Param('id', ParseIntPipe) id: number) {
    return this.manejoService.encerrar(id);
  }
}
