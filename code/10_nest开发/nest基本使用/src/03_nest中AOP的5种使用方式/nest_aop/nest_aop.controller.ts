import {
  Controller,
  Get,
  // Param,
  // Delete,
  // UseInterceptors,
  Query,
  UseFilters,
} from '@nestjs/common';
import { NestAopService } from './nest_aop.service';
// import { TimerInterceptor } from './timer.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

@Controller('nest_aop')
//可以在一个controller中添加intercepter,这样这个cpntroller中的所有handle全部生效
// @UseInterceptors(TimerInterceptor)
export class NestAopController {
  constructor(private readonly nestAopService: NestAopService) {}

  @Get()
  findAll() {
    //在全局中间件执行之后执行
    console.log('handle....');
    return this.nestAopService.findAll();
  }
  //使用guard实现AOP
  // @UseGuards(LoginGuard)
  @Get('aaa')
  Hello() {
    return 'aaa';
  }

  //使用interceptor实现AOP
  //单个路由实现interceptor
  // @UseInterceptors(TimerInterceptor)
  @Get('bbb')
  bbb() {
    return 'bbb';
  }

  //使用pipe进行参数验证，如果不通过会抛出异常，
  @Get('pipe')
  //使用自定义exceptionFileter实现全局异常
  //同样和intercepter,pipe，guard相同，都可以在全局使用
  @UseFilters(TestFilter)
  //在Query后面写，只会对单个路由生效
  pipe(@Query('num', ValidatePipe) num: number) {
    //这里返回的结果是经过pipe校验封装之后的结果
    return num + 1;
  }
}
