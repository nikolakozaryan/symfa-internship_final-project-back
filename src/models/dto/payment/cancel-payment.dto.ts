import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CancelPaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  paymentId: string;
}
