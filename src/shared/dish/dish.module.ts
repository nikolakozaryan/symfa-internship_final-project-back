import { Module } from '@nestjs/common';

import { DishService } from './services/dish.service';
import { DishController } from './controllers';

@Module({
  controllers: [DishController],
  providers: [DishService],
  exports: [DishService]
})
export class DishModule {}