import { Controller, Get } from '@nestjs/common';

import type { Delivery } from '@entities/delivery.entity';
import { GetUser } from '@core/decorators';

import { DeliveryService } from '../services';

@Controller('delivery')
export class DeliveryController {
  constructor(private _deliveryService: DeliveryService) {}

  @Get()
  async getDeliveries(@GetUser('sub') userId: string): Promise<Delivery[]> {
    return this._deliveryService.getDeliveries(userId);
  }
}
