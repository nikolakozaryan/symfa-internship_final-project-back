import { Module } from '@nestjs/common';

import { PaymentsController } from './controllers';
import { PaymentsService } from './services';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule {}