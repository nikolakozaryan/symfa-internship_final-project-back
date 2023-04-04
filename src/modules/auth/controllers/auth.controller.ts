import { Body, Controller, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';

import type { Token } from '@models/types';
import { GetUser, Public } from '@core/decorators';
import { LocalAuthGuard, RtAuthGuard } from '@core/guards';
import { CreateUserDto } from '@models/dto/user/createUser.dto';
import { LoginUserDto } from '@models/dto/user/loginUser.dto';

import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this._authService.createUser(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto): Promise<Token> {
    return this._authService.login(loginUserDto.email);
  }

  @Patch('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetUser('sub') userId: string): Promise<void> {
    await this._authService.logout(userId);
  }

  @Public()
  @UseGuards(RtAuthGuard)
  @Patch('refresh')
  async refresh(@GetUser('sub') userId: string, @GetUser('refreshToken') rt: string): Promise<Token> {
    return this._authService.refreshToken(rt, userId);
  }
}
