import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string): number {
    const val = parseInt(value, 10);
    if (isNaN(val) || isNaN(Number(value))) {
      throw new BadRequestException(
        'O parâmetro id precisa ser um número válido.',
      );
    }
    return val;
  }
}
