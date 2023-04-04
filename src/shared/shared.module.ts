import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Config } from '@core/config';
import { ENTITIES } from '@entities/index';

import { UserModule } from './user/user.module';

@Global()
@Module({})
export class SharedModule {
  static share(): DynamicModule {
    const SharedModules = [
      UserModule,
      TypeOrmModule.forRoot(Config.get.ormConfig('base')),
      TypeOrmModule.forFeature(ENTITIES),
      JwtModule.register({}),]

    return {
      module: SharedModule,
      imports: SharedModules,
      exports: SharedModules,
    }
  }
}