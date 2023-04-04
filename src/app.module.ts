import { Module } from '@nestjs/common';

import { APP_MODULES } from "@modules/index";
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [...APP_MODULES, SharedModule.share()],
  providers: [],
})
export class AppModule {}
