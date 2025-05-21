import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { AutomovelModule } from './modules/automovel/automovel.module';

@Module({
  imports: [PrismaModule, AutomovelModule],
  providers: [],
})
export class MainModule {}
