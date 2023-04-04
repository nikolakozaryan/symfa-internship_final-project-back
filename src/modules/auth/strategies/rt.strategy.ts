import type { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import type { IJwtPayload, IValidateOutcome } from '@models/types';
import { Config } from '@core/config';

import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Config.get.RefreshTokenOptions.secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: IJwtPayload): Promise<IValidateOutcome> {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();

    return { ...payload, refreshToken };
  }
}
