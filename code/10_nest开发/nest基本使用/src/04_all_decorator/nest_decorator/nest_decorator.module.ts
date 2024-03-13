import { Module } from '@nestjs/common';
import { NestDecoratorService } from './nest_decorator.service';
import { NestDecoratorController } from './nest_decorator.controller';
import { AaaController } from './aaa.controller';

@Module({
  controllers: [NestDecoratorController, AaaController],
  providers: [NestDecoratorService],
})
export class NestDecoratorModule {}
