import { DataSource } from 'typeorm';

import { Config } from './src/core/config';

export default new DataSource(Config.get.ormConfig('base'));
