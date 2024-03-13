import { Module } from '@nestjs/common';
import { CustomDecoratorController } from './custom-decorator.controller';

@Module({
  controllers: [CustomDecoratorController],
})
export class CustomDecoratorModule {}
