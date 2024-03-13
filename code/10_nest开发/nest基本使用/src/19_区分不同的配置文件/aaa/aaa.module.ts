import { Module } from '@nestjs/common';
import { AaaController } from './aaa.controller';
import { ConfigModule } from '@nestjs/config';
import config from './config';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  controllers: [AaaController],
})
export class AaaModule {}
