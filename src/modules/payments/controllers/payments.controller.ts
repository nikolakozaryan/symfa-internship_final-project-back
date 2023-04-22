import { Body, Controller, Delete, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { CreatePaymentMethodDto } from '@models/dto/payment/create-payment-method.dto';
import { PaymentRequestBodyDto } from '@models/dto/payment/payment-request-body.dto';

import type Stripe from 'stripe';
import { PaymentsService } from '../services';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private _paymentsService: PaymentsService) {}

  @ApiBody({ type: PaymentRequestBodyDto, isArray: true, description: 'paymentRequestBody' })
  @ApiCreatedResponse({ description: 'Returns when payment successfully created' })
  @ApiBadRequestResponse({ description: 'Returns when credentials are not valid' })
  @ApiUnauthorizedResponse({ description: 'Returns when access token is not valid or expired' })
  @Post()
  async createPayment(@Body() paymentRequestBody: PaymentRequestBodyDto[]): Promise<string> {
    return this._paymentsService.createPayment(paymentRequestBody);
  }

  @Delete()
  async cancelPayment(@Body('paymentId') paymentId: string): Promise<void> {
    await this._paymentsService.cancelPayment(paymentId);
  }

  @Post('method')
  async createPaymentMenthod(
    @Body() createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<Stripe.Response<Stripe.PaymentMethod>> {
    return this._paymentsService.createPaymentMethod(createPaymentMethodDto);
  }
}
