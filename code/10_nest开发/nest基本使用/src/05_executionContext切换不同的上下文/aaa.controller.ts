import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import { MyException } from './MyException';
import { BbbFilter } from './bbb.filter';
import { ExecuGuard } from './execu.guard';
import { Roles } from './roles.decorator';

@Controller('aaa')
export class AaaController {
  constructor() {}

  @Get('bbb')
  @UseFilters(BbbFilter)
  bbb() {
    throw new MyException('aaa', 'bbb');
  }
  @Get('ccc')
  //然后在 handler 上添加这个装饰器，参数为 admin，也就是给这个 handler 添加了一个 roles 为 admin 的metadata。
  @Roles('Admin')
  @UseGuards(ExecuGuard)
  ccc() {
    return '111';
  }
}
