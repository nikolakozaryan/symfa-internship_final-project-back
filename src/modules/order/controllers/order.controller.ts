import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { GetUser } from '@core/decorators';
import { Order } from '@entities/order.entity';
import { CreateOrderDto } from '@models/dto/order/createOrder.dto';

import { OrderService } from '../services';

@ApiUnauthorizedResponse({ description: 'Returns when access token is not valid or expired' })
@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private _orderService: OrderService) {}

  @ApiOkResponse({ type: Order, isArray: true, description: 'Returns list of user orders' })
  @Get()
  async getOrders(@GetUser('sub') userId: string): Promise<Order[]> {
    return this._orderService.getOrders(userId);
  }

  @ApiCreatedResponse({ description: 'Returns when order successfully created' })
  @ApiBadRequestResponse({ description: 'Returns when credentials are not valid' })
  @ApiBody({ type: CreateOrderDto })
  @Post()
  async createOrder(@GetUser('sub') userId: string, @Body() createOrderDto: any): Promise<void> {
    await this._orderService.createOrder(userId, createOrderDto as CreateOrderDto);
  }
}
