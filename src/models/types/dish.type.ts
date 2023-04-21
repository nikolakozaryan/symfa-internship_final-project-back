import type { DISH_TASTE, DISH_TYPES } from '@models/constants/dishes';

export type DishType = (typeof DISH_TYPES)[number];
export type TasteType = (typeof DISH_TASTE)[number];
