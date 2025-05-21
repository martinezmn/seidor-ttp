import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { AutomovelModule } from './modules/automovel/automovel.module';
import { MotoristaModule } from './modules/motorista/motorista.module';
import { ManejoModule } from './modules/manejo/manejo.module';

@Module({
  imports: [PrismaModule, AutomovelModule, MotoristaModule, ManejoModule],
  providers: [],
})
export class MainModule {}
