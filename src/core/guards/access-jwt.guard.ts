import type { Reflector } from '@nestjs/core';
import type { Observable } from 'rxjs';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AtAuthGuard extends AuthGuard('jwt') {
  constructor(private _reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this._reflector.get<boolean>('isPublic', context.getHandler());

    return isPublic || super.canActivate(context);
  }
}
