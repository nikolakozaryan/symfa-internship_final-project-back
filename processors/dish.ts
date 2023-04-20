import type { IProcessor } from 'typeorm-fixtures-cli';

import type { Dish } from '@entities/dish.entity';

import { DISH_TASTE, DISH_TYPES } from '../src/models/constants/dishes';

import { faker } from '@faker-js/faker';

export default class DishProcessor implements IProcessor<Dish> {
  taste: string = faker.helpers.arrayElement(DISH_TASTE);
  product: string = faker.commerce.product();
  productMaterial: string = faker.commerce.productMaterial();

  postProcess(name: string, object: { [key: string]: any }): void {
    object.id = faker.datatype.uuid();
    object.product = `${this.productMaterial} ${this.product}`;
    object.productName = `${this.taste} ${object.product}`;
    object.description = faker.commerce.productDescription();
    object.price = faker.commerce.price(20, 50);
    object.prepareTime = faker.datatype.number({ min: 20, max: 50, precision: 1 });
    object.rating = faker.datatype.number({ min: 2, max: 5, precision: 0.1 });
    object.image = faker.image.food(512, 512, true);
    object.type = faker.helpers.arrayElement(DISH_TYPES);
    object.taste = this.taste;
  }
}
