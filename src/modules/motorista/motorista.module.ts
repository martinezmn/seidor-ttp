import { Module } from '@nestjs/common';
import { MotoristaController } from './motorista.controller';
import { MotoristaService } from './motorista.service';

@Module({
  imports: [],
  controllers: [MotoristaController],
  providers: [MotoristaService],
})
export class MotoristaModule {}
