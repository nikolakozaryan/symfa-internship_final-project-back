import { Body, Controller, Post } from '@nestjs/common';

import type { PaymentRequestBody } from '@models/dto/payment/PaymentReqBody.dto';

import { PaymentsService } from '../services';

@Controller('payments')
export class PaymentsController {
  constructor(private _paymentsService: PaymentsService) {}

  @Post()
  async createPayment(@Body() paymentRequestBody: PaymentRequestBody[]): Promise<string> {
    return this._paymentsService.createPayment(paymentRequestBody);
  }
}
