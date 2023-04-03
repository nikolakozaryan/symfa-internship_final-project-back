import { config } from 'dotenv';

import type { IMap } from '@models/interfaces';

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

  // # JWT
}
