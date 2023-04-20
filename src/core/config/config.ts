import type { ValidationPipeOptions } from '@nestjs/common';
import type { JwtModuleOptions } from '@nestjs/jwt';
import type { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

import type { IMap } from '@models/interfaces';
import type { GoogleClientCredetials } from '@models/types/google.type';

// eslint-disable-next-line no-restricted-imports
import { INIT_MIGRATIONS, MIGRATIONS } from '../../../migrations';
import { ENTITIES } from '../../entities';

export class Config {
  private readonly _path: string = 'environments/.env';
  private readonly _env: IMap<string> = process.env;
  private static _instance: Config;

  private constructor() {
    config({ path: this._path });
  }

  static get get(): Config {
    if (!this._instance) {
      this._instance = new Config();
    }

    return this._instance;
  }

  // # Env
  get environment(): string {
    return this._env.NODE_ENV;
  }

  // # Server config
  get port(): number {
    return +(this._env.PORT || 4000);
  }

  get client(): string {
    return this._env.APP_CLIENT_URL;
  }

  // # Typeorm config

  get ormConfig() {
    return (type: 'base' | 'init'): DataSourceOptions => {
      const config: DataSourceOptions = {
        type: 'postgres',
        host: this._env.POSTGRES_HOST,
        port: Number(this._env.POSTGRES_PORT),
        username: this._env.POSTGRES_USER,
        password: this._env.POSTGRES_PASSWORD,
        database: this._env.POSTGRES_DB_NAME,
        entities: ENTITIES,
        migrations: MIGRATIONS,
      };

      const initConfig: DataSourceOptions = {
        ...config,
        database: this._env.POSTGRES_INIT_DB_NAME,
        entities: null,
        migrations: INIT_MIGRATIONS,
        migrationsTransactionMode: 'none',
      };

      if (type === 'base') return config;

      if (type === 'init') return initConfig;
    };
  }

  get hashSalt(): number {
    return Number(this._env.ENCODE_SALT);
  }

  // # JWT

  get AccessTokenOptions(): JwtModuleOptions {
    return {
      signOptions: {
        expiresIn: this._env.JWT_ACCESS_EXPIRES_IN,
      },
      secret: this._env.JWT_SECRET,
    };
  }

  get RefreshTokenOptions(): JwtModuleOptions {
    return { signOptions: { expiresIn: this._env.JWT_REFRESH_EXPIRES_IN }, secret: this._env.JWT_REFRESH_SECRET };
  }

  // # ValidationPipe

  get ValidationOptions(): ValidationPipeOptions {
    return { whitelist: true, forbidNonWhitelisted: true };
  }

  get StripeKey(): string {
    return this._env.STRIPE_SECRET_KEY;
  }

  get GoogleCredentials(): GoogleClientCredetials {
    return {
      clientId: this._env.GOOGLE_CLIENT_ID,
      clientSecret: this._env.GOOGLE_CLIENT_SECRET,
    };
  }

  get GatewayConfig(): any {
    return {
      cors: {
        origin: this._env.APP_CLIENT_URL,
      },
      connectionStateRecovery: {
        maxDisconnectionDuration: 2 * 60 * 1000,
        skipMiddlewares: true,
      },
    };
  }
}
