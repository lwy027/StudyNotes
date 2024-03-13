import {
  BeforeApplicationShutdown,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { BbbService } from './bbb.service';
import { BbbController } from './bbb.controller';

@Module({
  controllers: [BbbController],
  providers: [BbbService],
})
export class BbbModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log('BbbModule onModuleInit');
  }
  beforeApplicationShutdown(signal?: string) {
    console.log('BbbModule beforeApplicationShutdown', signal);
  }
  onApplicationShutdown() {
    console.log('BbbModule onApplicationShutdown');
  }
  onModuleDestroy() {
    console.log('BbbModule OnModuleDestroy');
  }
  onApplicationBootstrap() {
    console.log('BbbModule onApplicationBootstrap');
  }
}
