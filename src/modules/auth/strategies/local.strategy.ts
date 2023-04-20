import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import type { UserType } from '@models/types';
import { ERROR_MESSAGES } from '@models/constants/errors';

import { AuthService } from '../services';

import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private _authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<UserType> {
    const user = await this._authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.WrongPassword);
    }

    return user;
  }
}
