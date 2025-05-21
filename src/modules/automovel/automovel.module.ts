import { Module } from '@nestjs/common';
import { AutomovelController } from './automovel.controller';
import { AutomovelService } from './automovel.service';

@Module({
  imports: [],
  controllers: [AutomovelController],
  providers: [AutomovelService],
})
export class AutomovelModule {}
