import type { Order } from '@entities/order.entity';

import { getDeliveryTime } from './get-delivery-time';
import { getMaxCookingTime } from './get-max-cooking-time';

export const getDeliveryDate = (order: Order): Date => {
  const deliveryTime = getDeliveryTime();
  const cookingTime = getMaxCookingTime(order);

  return new Date(Date.now() + (deliveryTime + cookingTime) * 60000);
};
