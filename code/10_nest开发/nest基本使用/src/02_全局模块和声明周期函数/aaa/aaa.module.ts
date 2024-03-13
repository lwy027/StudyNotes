import {
  BeforeApplicationShutdown,
  Global,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { ModuleRef } from '@nestjs/core';

@Global()
@Module({
  controllers: [AaaController],
  providers: [AaaService],
  exports: [AaaService],
})
export class AaaModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private moduleRef: ModuleRef) {}
  onModuleDestroy() {
    console.log('AaaModule OnModuleDestroy');
  }
  onApplicationShutdown() {
    console.log('AaaModule onApplicationShutdown');
  }
  beforeApplicationShutdown(signal?: string) {
    //MuduleRef可以获取组件模块的provider的引用
    //拿到AaaService实例引用,执行里面的方法
    const aaaService = this.moduleRef.get<AaaService>(AaaService);
    console.log('--------------------------', aaaService.findAll());
    console.log('AaaModule beforeApplicationShutdown', signal);
  }
  onModuleInit() {
    console.log('AaaModule onModuleInit');
  }
  onApplicationBootstrap() {
    console.log('AaaModule onApplicationBootstrap');
  }
}
