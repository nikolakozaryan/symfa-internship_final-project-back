import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

import type { User } from '@entities/user.entity';
import { GetUser } from '@core/decorators';

import { UsersService } from '../services';

@ApiTags('User')
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: 'Access token',
})
@Controller('user')
export class UserController {
  constructor(private _usersService: UsersService) {}

  @Get()
  findOne(@GetUser('sub') userId: string): Promise<User> {
    return this._usersService.findOneById(userId);
  }
}
