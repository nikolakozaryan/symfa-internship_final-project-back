import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  dishIds: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;
}
