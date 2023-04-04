import type { NestExpressApplication } from '@nestjs/platform-express';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { join } from 'path';

import { Config } from '@core/config';
import { AtAuthGuard } from '@core/guards';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  const reflector = app.get(Reflector);

  app.useGlobalGuards(new AtAuthGuard(reflector));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalPipes(new ValidationPipe(Config.get.ValidationOptions));
  app.useStaticAssets(join(__dirname, '..', '..', 'public'), {
    prefix: '/public/',
  });

  await app.listen(Config.get.port);
}
bootstrap();
