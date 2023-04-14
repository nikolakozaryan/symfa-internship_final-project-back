import { Controller, Get, ParseUUIDPipe, Patch, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { GetUser } from '@core/decorators';
import { User } from '@entities/user.entity';

import { UsersService } from '../services';

@ApiTags('User')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Returns when access token is not valid or expired' })
@Controller('user')
export class UserController {
  constructor(private _usersService: UsersService) {}

  @ApiOkResponse({ type: User, description: 'Return logged in user information' })
  @Get()
  async findOne(@GetUser('sub') userId: string): Promise<User> {
    return this._usersService.findOneById(userId);
  }

  @ApiOkResponse({
    type: String,
    description: "Return added to fav dish id when dish successfully toggled to user's fav list",
  })
  @ApiQuery({ name: 'dishId', type: String, required: true })
  @Patch()
  async toggleFav(@GetUser('sub') userId: string, @Query('dishId', ParseUUIDPipe) dishId: string): Promise<string> {
    await this._usersService.toggleFav(userId, dishId);

    return dishId;
  }
}
