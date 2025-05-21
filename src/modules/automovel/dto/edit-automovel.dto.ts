import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditAutomovelDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'O campo placa deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O campo placa deve ser uma string válida.' })
  placa?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'O campo cor deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O campo cor deve ser uma string válida.' })
  cor?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'O campo marca deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O campo marca deve ser uma string válida.' })
  marca?: string;
}
