import {
  Controller,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { BbbService } from './bbb.service';

import { AaaService } from 'src/02_全局模块和声明周期函数/aaa/aaa.service';

@Controller('bbb')
export class BbbController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(
    private readonly bbbService: BbbService,
    private readonly aaaService: AaaService,
  ) {}
  onModuleInit() {
    console.log('BbbController onModuleInit');
  }
  onApplicationShutdown(signal?: string) {
    console.log('BbbController onApplicationShutdown', signal);
  }
  beforeApplicationShutdown() {
    console.log('BbbController beforeApplicationShutdown');
  }
  onModuleDestroy() {
    console.log('BbbController OnModuleDestroy');
  }
  onApplicationBootstrap() {
    console.log('BbbController onApplicationBootstrap');
  }
}
