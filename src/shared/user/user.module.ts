import { Module } from '@nestjs/common';

import { UserController } from './controllers';
import { UsersService } from './services';

@Module({
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService]
})
export class UserModule {}