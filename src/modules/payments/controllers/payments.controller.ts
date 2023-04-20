import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { PaymentRequestBody } from '@models/dto/payment/payment-request-body.dto';

import { PaymentsService } from '../services';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private _paymentsService: PaymentsService) {}

  @ApiBody({ type: PaymentRequestBody, isArray: true, description: 'paymentRequestBody' })
  @ApiCreatedResponse({ description: 'Returns when payment successfully created' })
  @ApiBadRequestResponse({ description: 'Returns when credentials are not valid' })
  @ApiUnauthorizedResponse({ description: 'Returns when access token is not valid or expired' })
  @Post()
  async createPayment(@Body() paymentRequestBody: PaymentRequestBody[]): Promise<string> {
    return this._paymentsService.createPayment(paymentRequestBody);
  }
}
