import type { Dish } from '@entities/dish.entity';
import type { Order } from '@entities/order.entity';

export const getMaxCookingTime = (order: Order): number => {
  const cookingTimes = order.dishes.map((item: Dish) => item.prepareTime);

  return Math.max(...cookingTimes);
};
