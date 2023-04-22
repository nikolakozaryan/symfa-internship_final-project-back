import { Body, Controller, Delete, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CancelPaymentDto } from '@models/dto/payment/cancel-payment.dto';
import { CreatePaymentMethodDto } from '@models/dto/payment/create-payment-method.dto';
import { PaymentRequestBodyDto } from '@models/dto/payment/payment-request-body.dto';

import type Stripe from 'stripe';
import { PaymentsService } from '../services';

@ApiTags('Payments')
@ApiUnauthorizedResponse({ description: 'Returns when access token is not valid or expired' })
@ApiBadRequestResponse({ description: 'Returns when credentials are not valid' })
@Controller('payments')
export class PaymentsController {
  constructor(private _paymentsService: PaymentsService) {}

  @ApiBody({ type: PaymentRequestBodyDto, isArray: true, description: 'paymentRequestBody' })
  @ApiCreatedResponse({ description: 'Returns when payment successfully created' })
  @Post()
  async createPayment(@Body() paymentRequestBody: PaymentRequestBodyDto[]): Promise<string> {
    return this._paymentsService.createPayment(paymentRequestBody);
  }

  @Post('method')
  @ApiCreatedResponse({ description: 'Returns stripe payment method' })
  async createPaymentMenthod(
    @Body() createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<Stripe.Response<Stripe.PaymentMethod>> {
    return this._paymentsService.createPaymentMethod(createPaymentMethodDto);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: CancelPaymentDto })
  @ApiOkResponse({ description: 'Returns when payment was successfully canceled' })
  async cancelPayment(@Body('paymentId') paymentId: string): Promise<void> {
    await this._paymentsService.cancelPayment(paymentId);
  }
}
