import { BadRequestException, Injectable } from '@nestjs/common';

import type { Dish } from '@entities/dish.entity';
import type { PaymentRequestBody } from '@models/dto/payment/PaymentReqBody.dto';
import { Config } from '@core/config';
import { DishService } from '@shared/dish/services';

import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private _stripe: Stripe;
  constructor(private _dishService: DishService) {
    this._stripe = new Stripe(Config.get.StripeKey, { apiVersion: '2022-11-15' });
  }

  async createPayment(paymentRequestBody: PaymentRequestBody[]): Promise<string> {
    const dishIds = paymentRequestBody.map((item: PaymentRequestBody) => item.id);

    await this._dishService.getDishesByIds(dishIds);
    const dishes = await this._dishService.getDishesByIds(dishIds);
    const sumAmount = paymentRequestBody.reduce((acc: number, item: PaymentRequestBody) => {
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
      throw new BadRequestException();
    }
  }
}
