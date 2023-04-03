import { Module } from '@nestjs/common';

import { APP_MODULES } from "@modules/index";

@Module({
  imports: [...APP_MODULES],
  providers: [],
})
export class AppModule {}
