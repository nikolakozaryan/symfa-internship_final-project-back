import { Injectable, InternalServerErrorException } from '@nestjs/common';

import type { Dish } from '@entities/dish.entity';
import type { CreatePaymentMethodDto } from '@models/dto/payment/create-payment-method.dto';
import type { PaymentRequestBodyDto } from '@models/dto/payment/payment-request-body.dto';
import { Config } from '@core/config';
import { ERROR_MESSAGES } from '@models/constants/errors';
import { DishService } from '@shared/dish/services';

import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private _stripe: Stripe;
  constructor(private _dishService: DishService) {
    this._stripe = new Stripe(Config.get.StripeKey, { apiVersion: '2022-11-15' });
  }

  async createPayment(paymentRequestBody: PaymentRequestBodyDto[]): Promise<string> {
    const dishIds = paymentRequestBody.map((item: PaymentRequestBodyDto) => item.id);
    const dishes = await this._dishService.getDishesByIds(dishIds);
    const sumAmount = paymentRequestBody.reduce((acc: number, item: PaymentRequestBodyDto) => {
      const dish = dishes.find((dishItem: Dish) => dishItem.id === item.id);

      return acc + dish.price * item.amount;
    }, 0);

    try {
      const paymentIntents = await this._stripe.paymentIntents.create({
        amount: sumAmount * 100,
        currency: 'usd',
      });

      return paymentIntents.client_secret;
    } catch {
      throw new InternalServerErrorException(ERROR_MESSAGES.StripeError);
    }
  }

  async createPaymentMethod(cardData: CreatePaymentMethodDto): Promise<Stripe.Response<Stripe.PaymentMethod>> {
    return this._stripe.paymentMethods.create({
      type: 'card',
      card: cardData,
    });
  }

  async cancelPayment(id: string): Promise<void> {
    await this._stripe.paymentIntents.cancel(id);
  }
}
