import {
  BeforeApplicationShutdown,
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';

@Injectable()
export class AaaService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  create(createAaaDto: CreateAaaDto) {
    return 'This action adds a new aaa';
  }
  onApplicationShutdown(signal?: string) {
    console.log('AaaService onApplicationShutdown', signal);
  }
  beforeApplicationShutdown() {
    console.log('AaaService beforeApplicationShutdown');
  }
  onModuleDestroy() {
    console.log('AaaService OnModuleDestroy');
  }
  onModuleInit() {
    console.log('AaaService onModuleInit');
  }
  onApplicationBootstrap() {
    console.log('AaaService onApplicationBootstrap');
  }
  findAll() {
    return `This action returns all aaa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aaa`;
  }

  update(id: number, updateAaaDto: UpdateAaaDto) {
    return `This action updates a #${id} aaa`;
  }

  remove(id: number) {
    return `This action removes a #${id} aaa`;
  }
}
