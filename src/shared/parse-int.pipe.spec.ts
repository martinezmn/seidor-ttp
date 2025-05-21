import { ParseIntPipe } from './parse-int.pipe';
import { BadRequestException } from '@nestjs/common';

describe('ParseIntPipe', () => {
  let pipe: ParseIntPipe;

  beforeEach(() => {
    pipe = new ParseIntPipe();
  });

  it('transforma strings de números em number', () => {
    expect(pipe.transform('123')).toBe(123);
    expect(pipe.transform('-42')).toBe(-42);
    expect(pipe.transform('0')).toBe(0);
  });

  it('erro ao tentar transformar strings não numéricas ou inválidas', () => {
    expect(() => pipe.transform('abc')).toThrow(BadRequestException);
    expect(() => pipe.transform('12abc')).toThrow(BadRequestException);
    expect(() => pipe.transform('')).toThrow(BadRequestException);
    expect(() => pipe.transform(' ')).toThrow(BadRequestException);
    expect(() => pipe.transform(undefined as unknown as string)).toThrow(
      BadRequestException,
    );
    expect(() => pipe.transform(null as unknown as string)).toThrow(
      BadRequestException,
    );
  });
});
