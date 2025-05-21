import { Module } from '@nestjs/common';
import { ManejoController } from './manejo.controller';
import { ManejoService } from './manejo.service';

@Module({
  imports: [],
  controllers: [ManejoController],
  providers: [ManejoService],
})
export class ManejoModule {}
