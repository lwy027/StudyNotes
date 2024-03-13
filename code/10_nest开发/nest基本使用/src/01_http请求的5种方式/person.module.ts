import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

@Module({
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService], //使用exports后，其他的模块就可以注入当前模块的service了
})
export class PersonModule {}
