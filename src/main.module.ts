import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { AutomovelModule } from './modules/automovel/automovel.module';
import { MotoristaModule } from './modules/motorista/motorista.module';

@Module({
  imports: [PrismaModule, AutomovelModule, MotoristaModule],
  providers: [],
})
export class MainModule {}
