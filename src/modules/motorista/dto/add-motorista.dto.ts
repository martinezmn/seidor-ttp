import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddMotoristaDto {
  @ApiProperty()
  @IsString({ message: 'O campo nome deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O campo nome deve ser uma string válida.' })
  nome: string;
}
