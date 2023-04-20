import { Module } from '@nestjs/common';

import { DeliveryController } from './controllers';
import { DeliveryGateway } from './gateways';
import { DeliveryService } from './services';

@Module({
  controllers: [DeliveryController],
  providers: [DeliveryGateway, DeliveryService],
  exports: [DeliveryGateway, DeliveryService]
})
export class DeliveryModule {}