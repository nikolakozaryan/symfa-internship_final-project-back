import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import type { Delivery } from '@entities/delivery.entity';
import { GetUser } from '@core/decorators';
import { DeliveryResponse } from '@models/dto/delivery/delivery-response.dto';

import { DeliveryService } from '../services';

@ApiTags('Delivery')
@Controller('delivery')
export class DeliveryController {
  constructor(private _deliveryService: DeliveryService) {}

  @Get()
  @ApiOkResponse({ type: DeliveryResponse, description: 'Returns list of active deliveries' })
  @ApiUnauthorizedResponse({ description: 'Returns when access token is not valid or expired' })
  async getDeliveries(@GetUser('sub') userId: string): Promise<Delivery[]> {
    return this._deliveryService.getDeliveries(userId);
  }
}
