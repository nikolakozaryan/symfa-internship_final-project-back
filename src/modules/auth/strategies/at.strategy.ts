import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import type { IJwtPayload } from '@models/types';
import { Config } from '@core/config';

import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Config.get.AccessTokenOptions.secret,
    });
  }

  async validate(payload: IJwtPayload): Promise<IJwtPayload> {
    return payload;
  }
}
