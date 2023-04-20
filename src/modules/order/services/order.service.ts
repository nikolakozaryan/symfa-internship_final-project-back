import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { CreateOrderDto } from '@models/dto/order/create-order.dto';
import { getDeliveryTime } from '@core/helpers/get-delivery-time';
import { getMaxCookingTime } from '@core/helpers/get-max-cooking-time';
import { Delivery } from '@entities/delivery.entity';
import { Order } from '@entities/order.entity';
import { DeliveryGateway } from '@shared/delivery/gateways/delivery.gateway';
import { DeliveryService } from '@shared/delivery/services';
import { DishService } from '@shared/dish/services';
import { UsersService } from '@shared/user/services';

import { faker } from '@faker-js/faker';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private _orderRepository: Repository<Order>,
    @InjectRepository(Delivery) private _deliveryRepository: Repository<Delivery>,
    private _dishService: DishService,
    private _userService: UsersService,
    private _deliveryService: DeliveryService,
    private _deliveryGateway: DeliveryGateway,
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

    const newDelivery = new Delivery();

    newDelivery.destination = faker.address.cityName();
    newDelivery.deliveryman = await this._deliveryService.getRandomDeliveryman();
    newDelivery.user = user;
    newDelivery.deliveryDate = new Date(Date.now() + (getDeliveryTime() + getMaxCookingTime(order)) * 60 * 1000);

    const delivery = await this._deliveryRepository.save(newDelivery);

    this._deliveryGateway.sendDelivery(delivery);
  }

  async getOrders(userId: string): Promise<Order[]> {
    return this._orderRepository.find({
      relations: { dishes: true },
      select: { id: true, createdAt: true, totalPrice: true, dishes: { id: true, productName: true } },
      where: { user: { id: userId } },
      order: { createdAt: 'desc' },
    });
  }
}
