import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { CreateOrderDto } from '@models/dto/order/create-order.dto';
import { getDeliveryDate } from '@core/helpers/get-delivery-date';
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
    const { totalPrice, dishIds } = createOrderDto;
    const dishes = await this._dishService.getDishesByIds(dishIds);
    const user = await this._userService.findOneById(userId);
    const order = new Order(user, dishes, totalPrice);

    await this._orderRepository.save(order);

    const destination = faker.address.cityName();
    const deliveryman = await this._deliveryService.getRandomDeliveryman();
    const deliveryDate = getDeliveryDate(order);

    const newDelivery = new Delivery(user, deliveryman, deliveryDate, destination);
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
