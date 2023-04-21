import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  dishIds: string[];

  @ApiProperty()
  totalPrice: number;
}
