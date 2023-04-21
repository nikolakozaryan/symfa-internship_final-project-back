import type { NestExpressApplication } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';

import type { SocketWithUserID } from '@models/types';
import { Config } from '@core/config';

import type { Server } from 'socket.io';
import type { ExtendedError } from 'socket.io/dist/namespace';

export class CustomWsAdapter extends IoAdapter {
  _jwtService: JwtService;
  constructor(private _app: NestExpressApplication) {
    super(_app);
    _app.resolve<JwtService>(JwtService).then((jwtService: JwtService) => {
      this._jwtService = jwtService;
    });
  }

  createIOServer(port: number, options?: any): any {
    const server: Server = super.createIOServer(port, options);

    server.use((socket: SocketWithUserID, next: (err?: ExtendedError) => void) => {
      const { token } = socket.handshake.auth;

      if (token) {
        try {
          const user = this._jwtService.verify(token, { secret: Config.get.AccessTokenOptions.secret });

          if (user) {
            socket.userId = user.sub;
            next();
          }
        } catch {
          socket.disconnect();
        }
      } else {
        socket.disconnect();
      }
    });

    return server;
  }
}
