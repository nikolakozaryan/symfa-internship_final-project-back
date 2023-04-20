import { ApiProperty } from '@nestjs/swagger';

import { Dish } from '@entities/dish.entity';

export class ResponseDishesDto {
  @ApiProperty({ default: 1 })
  page: number;

  @ApiProperty({ default: 1 })
  pages: number;

  @ApiProperty()
  amount: number;

  @ApiProperty({ type: [Dish] })
  dishes: Dish[];
}
