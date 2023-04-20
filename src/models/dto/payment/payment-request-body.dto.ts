import { ApiProperty } from '@nestjs/swagger';

export class PaymentRequestBody {
  @ApiProperty()
  id: string;

  @ApiProperty()
  amount: number;
}
