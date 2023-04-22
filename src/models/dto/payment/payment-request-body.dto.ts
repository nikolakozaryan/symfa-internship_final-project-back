import { ApiProperty } from '@nestjs/swagger';

export class PaymentRequestBodyDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  amount: number;
}
