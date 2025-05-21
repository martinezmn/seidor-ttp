import { Transform } from 'class-transformer';
import {
  IsDate,
  isISO8601,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class AtribuirManejoDto {
  @IsNumber(undefined, {
    message: 'O campo automovelId deve ser um id válido.',
  })
  automovelId: number;

  @IsNumber(undefined, {
    message: 'O campo motoristaId deve ser um id válido.',
  })
  motoristaId: number;

  @IsDate({ message: 'O campo dataInicio deve ser uma data válida.' })
  @Transform(({ value }: { value: string }) =>
    isISO8601(value) ? new Date(value) : value,
  )
  dataInicio: Date;

  @IsString({ message: 'O campo motivo deve ser uma string válida.' })
  @IsNotEmpty({ message: 'O campo motivo deve ser uma string válida.' })
  motivo: string;
}
