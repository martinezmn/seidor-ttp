import { IsNotEmpty, IsString } from 'class-validator';

export class AddAutomovelDto {
  @IsString({ message: 'O campo placa deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O campo placa deve ser uma string válida.' })
  placa: string;

  @IsString({ message: 'O campo cor deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O campo cor deve ser uma string válida.' })
  cor: string;

  @IsString({ message: 'O campo marca deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O campo marca deve ser uma string válida.' })
  marca: string;
}
