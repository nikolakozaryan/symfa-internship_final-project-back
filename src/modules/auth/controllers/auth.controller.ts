import { Body, Controller, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { GetUser, Public } from '@core/decorators';
import { LocalAuthGuard, RtAuthGuard } from '@core/guards';
import { CreateUserDto } from '@models/dto/user/createUser.dto';
import { LoginUserDto } from '@models/dto/user/loginUser.dto';
import { Token } from '@models/types';

import { AuthService } from '../services';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @ApiCreatedResponse({ description: 'Returns when user successfully created' })
  @ApiBadRequestResponse({ description: 'Returns when credentials are not valid' })
  @ApiConflictResponse({ description: 'Returns when user with such email already exists' })
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this._authService.createUser(createUserDto);
  }

  @ApiOkResponse({ type: Token, description: 'Returns when user successfully logged in' })
  @ApiBadRequestResponse({ description: 'Returns when credentials are not valid' })
  @ApiUnauthorizedResponse({ description: "Returns when email doesn't exist or password is wrong" })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto): Promise<Token> {
    return this._authService.login(loginUserDto.email);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Returns when user successfully logged out' })
  @ApiUnauthorizedResponse({ description: 'Returns when access token is not valid or expired' })
  @Patch('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetUser('sub') userId: string): Promise<void> {
    await this._authService.logout(userId);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: Token, description: 'Returns when tokens succesfully refreshed' })
  @ApiBadRequestResponse({ description: 'Returns when credentials are not valid' })
  @ApiUnauthorizedResponse({ description: 'Returns when refresh token is not valid or expired' })
  @Public()
  @UseGuards(RtAuthGuard)
  @Patch('refresh')
  async refresh(@GetUser('sub') userId: string, @GetUser('refreshToken') rt: string): Promise<Token> {
    return this._authService.refreshToken(rt, userId);
  }

  @Public()
  @ApiOkResponse({ type: Token, description: 'Returns when user successfully logged in' })
  @ApiBadRequestResponse({ description: 'Returns when credentials are not valid' })
  @ApiConflictResponse({ description: 'Returns when user with such email already exists' })
  @Post('google')
  async googleLogin(@Body('token') token: string): Promise<Token> {
    return this._authService.loginGoogle(token);
  }
}
