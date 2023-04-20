import type { IProcessor } from 'typeorm-fixtures-cli';

import type { Dish } from '@entities/dish.entity';

import { faker } from '@faker-js/faker';

export default class DeliverymanProcessor implements IProcessor<Dish> {
  postProcess(name: string, object: { [key: string]: any }): void {
    object.id = faker.datatype.uuid();
    object.name = faker.name.fullName({ sex: 'male' });
  }
}
