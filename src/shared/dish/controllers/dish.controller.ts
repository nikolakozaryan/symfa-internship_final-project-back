import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import type { DishType, TasteType } from '@models/types/dish';
import { GetUser } from '@core/decorators';
import { ResponseDishesDto } from '@models/dto/dish/responseDishes.dto';

import { DishService } from '../services';

@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Returns when access token is not valid or expired' })
@ApiTags('Dish')
@Controller('dishes')
export class DishController {
  constructor(private _dishService: DishService) {}

  @ApiOkResponse({ type: ResponseDishesDto, description: 'Returns paginated list of dishes' })
  @ApiQuery({ name: 'search', type: String, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'type', type: String, required: false })
  @Get()
  async getDishes(
    @GetUser('sub') userId: string,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('type') dishType?: DishType,
  ): Promise<ResponseDishesDto> {
    return this._dishService.getDishes(userId, false, search || '', +page || 1, dishType);
  }

  @ApiOkResponse({ type: ResponseDishesDto, description: 'Returns paginated list of favorites dishes' })
  @ApiQuery({ name: 'search', type: String, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'taste', type: String, required: false })
  @Get('fav')
  async getFav(
    @GetUser('sub') userId: string,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('taste') dishTaste?: TasteType,
  ): Promise<ResponseDishesDto> {
    return this._dishService.getDishes(userId, true, search || '', +page || 1, dishTaste);
  }
}
