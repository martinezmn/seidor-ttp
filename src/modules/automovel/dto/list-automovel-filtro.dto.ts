import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ListAutomovelFiltroDto {
  @IsOptional()
  @IsString({ message: 'O campo cor deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O campo cor deve ser uma string válida.' })
  cor?: string;

  @IsOptional()
  @IsString({ message: 'O campo marca deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O campo marca deve ser uma string válida.' })
  marca?: string;
}
