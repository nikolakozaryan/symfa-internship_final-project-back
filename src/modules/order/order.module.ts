import { Module } from '@nestjs/common';

import { OrderController } from './controllers';
import { OrderService } from './services';

@Module({
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}