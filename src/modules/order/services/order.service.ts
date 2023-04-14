import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { CreateOrderDto } from '@models/dto/order/createOrder.dto';
import { Order } from '@entities/order.entity';
import { DishService } from '@shared/dish/services';
import { UsersService } from '@shared/user/services';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private _orderRepository: Repository<Order>,
    private _dishService: DishService,
    private _userService: UsersService,
  ) {}

  async createOrder(userId: string, createOrderDto: CreateOrderDto): Promise<void> {
    const { createdAt, totalPrice, dishIds } = createOrderDto;
    const dishes = await this._dishService.getDishesByIds(dishIds);
    const user = await this._userService.findOneById(userId);
    const order = new Order();

    order.user = user;
    order.dishes = dishes;
    order.totalPrice = totalPrice;
    order.createdAt = new Date(createdAt);

    await this._orderRepository.save(order);
  }

  async getOrders(userId: string): Promise<Order[]> {
    return this._orderRepository.find({
      select: { createdAt: true, totalPrice: true, dishes: { productName: true } },
      relations: { dishes: true },
      where: { user: { id: userId } },
      order: { createdAt: 'desc' },
    });
  }
}
