import { ApiProperty } from '@nestjs/swagger';

import { Deliveryman } from '@entities/deliveryman.entity';

export class DeliveryResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  deliveryDate: Date;

  @ApiProperty()
  destination: string;

  @ApiProperty({ type: Deliveryman })
  deliveryman: Deliveryman;
}
