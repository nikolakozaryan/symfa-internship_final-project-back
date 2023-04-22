import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentMethodDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  exp_month: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  exp_year: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cvc: string;
}
