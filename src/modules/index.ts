import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { PaymentsModule } from './payments/payments.module';

export const APP_MODULES = [
  AuthModule,
  PaymentsModule,
  OrderModule
];
