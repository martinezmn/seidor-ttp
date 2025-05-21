import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditAutomovelDto {
  @IsOptional()
  @IsString({ message: 'O campo placa deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O campo placa deve ser uma string válida.' })
  placa?: string;

  @IsOptional()
  @IsString({ message: 'O campo cor deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O campo cor deve ser uma string válida.' })
  cor?: string;

  @IsOptional()
  @IsString({ message: 'O campo marca deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O campo marca deve ser uma string válida.' })
  marca?: string;
}
