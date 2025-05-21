import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ListAutomovelFiltroDto {
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'O campo cor deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O campo cor deve ser uma string válida.' })
  cor?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'O campo marca deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O campo marca deve ser uma string válida.' })
  marca?: string;
}
