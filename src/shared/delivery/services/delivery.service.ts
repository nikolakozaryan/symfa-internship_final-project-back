import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { getRandomNumber } from '@core/helpers/get-random-number';
import { Delivery } from '@entities/delivery.entity';
import { Deliveryman } from '@entities/deliveryman.entity';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Deliveryman) private _deliverymanRepository: Repository<Deliveryman>,
    @InjectRepository(Delivery) private _deliveryRepository: Repository<Delivery>,
  ) {}

  async getDeliveries(userId: string): Promise<Delivery[]> {
    return this._deliveryRepository.find({
      relations: { deliveryman: true },
      select: { deliveryDate: true, destination: true, id: true },
      where: {
        user: {
          id: userId,
        },
        deliveryDate: MoreThan(new Date()),
      },
      order: {
        deliveryDate: 'asc',
      },
    });
  }

  async getRandomDeliveryman(): Promise<Deliveryman> {
    const deliverimen = await this._deliverymanRepository.find();
    const randomIndex = getRandomNumber(deliverimen.length - 1);

    return deliverimen[randomIndex];
  }
}
