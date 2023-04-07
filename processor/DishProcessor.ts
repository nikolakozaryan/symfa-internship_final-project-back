import type { IProcessor } from 'typeorm-fixtures-cli';

import type { Dish } from '@entities/dish.entity';
import { DISH_TYPES } from '@models/constants/dishes';

import { faker } from '@faker-js/faker';

export default class UserProcessor implements IProcessor<Dish> {
  postProcess(name: string, object: { [key: string]: any }): void {
    object.product = faker.commerce.product();
    object.productName = faker.commerce.productName();
    object.description = faker.commerce.productDescription();
    object.id = faker.datatype.uuid();
    object.price = faker.commerce.price(20, 50);
    object.prepareTime = faker.datatype.number({ min: 20, max: 50, precision: 1 });
    object.rating = faker.datatype.number({ min: 2, max: 5, precision: 0.1 });
    object.image = faker.image.food(512, 512, true);
    object.type = faker.helpers.arrayElement(DISH_TYPES);
  }
}
