import { Body, Controller, Get, Post } from '@nestjs/common';

import type { Order } from '@entities/order.entity';
import type { CreateOrderDto } from '@models/dto/order/createOrder.dto';
import { GetUser } from '@core/decorators';

import { OrderService } from '../services';

@Controller('order')
export class OrderController {
  constructor(private _orderService: OrderService) {}

  @Get()
  async getOrders(@GetUser('sub') userId: string): Promise<Order[]> {
    return this._orderService.getOrders(userId);
  }

  @Post()
  async createOrder(@GetUser('sub') userId: string, @Body() createOrderDto: any): Promise<void> {
    await this._orderService.createOrder(userId, createOrderDto as CreateOrderDto);
  }
}
