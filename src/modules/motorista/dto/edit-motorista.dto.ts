import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditMotoristaDto {
  @IsOptional()
  @IsString({ message: 'O campo nome deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O campo nome deve ser uma string válida.' })
  nome?: string;
}
