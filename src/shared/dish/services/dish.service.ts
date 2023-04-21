import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, In, Repository } from 'typeorm';

import type { ResponseDishesDto } from '@models/dto/dish/response-dishes.dto';
import type { DishType, TasteType } from '@models/types';
import { Dish } from '@entities/dish.entity';
import { DISHES_PER_PAGE } from '@models/constants/pagination';
import { UsersService } from '@shared/user/services';

@Injectable()
export class DishService {
  constructor(@InjectRepository(Dish) private _dishRepository: Repository<Dish>, private _userService: UsersService) {}

  async getDishes(
    userId: string,
    fav: boolean,
    searchQuery: string,
    page: number,
    dishType?: DishType | TasteType,
  ): Promise<ResponseDishesDto> {
    const user = await this._userService.findOneById(userId);

    const favFilter: FindOptionsWhere<Dish> = fav ? { id: In(user.favs), taste: dishType } : null;
    const dishTypeFilter: FindOptionsWhere<Dish> = dishType ? { type: dishType } : null;

    const filter = favFilter || dishTypeFilter;

    const [dishes, amount] = await this._dishRepository.findAndCount({
      where: { productName: ILike(`%${searchQuery}%`), ...filter },
      skip: (page - 1) * DISHES_PER_PAGE,
      take: DISHES_PER_PAGE,
    });

    const pages = Math.ceil(amount / DISHES_PER_PAGE) || 1;

    return { page, pages, amount, dishes };
  }

  async getDishesByIds(ids: string[]): Promise<Dish[]> {
    return this._dishRepository.find({ where: { id: In(ids) } });
  }
}
