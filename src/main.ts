import { NestFactory } from '@nestjs/core';

import { Config } from '@core/config';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  await app.listen(Config.get.port);
}
bootstrap();
