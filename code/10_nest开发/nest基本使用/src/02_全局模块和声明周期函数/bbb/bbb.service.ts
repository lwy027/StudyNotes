import {
  BeforeApplicationShutdown,
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

@Injectable()
export class BbbService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  beforeApplicationShutdown(signal?: string) {
    console.log('BbbService beforeApplicationShutdown', signal);
  }
  onApplicationShutdown() {
    console.log('BbbService onApplicationShutdown');
  }
  onModuleDestroy() {
    console.log('BbbService OnModuleDestroy');
  }
  onApplicationBootstrap() {
    console.log('BbbService onApplicationBootstrap');
  }
  onModuleInit() {
    console.log('BbbService onModuleInit');
  }
  findAll() {
    return `This action returns all bbb`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bbb`;
  }
}
