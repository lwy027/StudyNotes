import {
  Controller,
  Get,
  Headers,
  HttpException,
  Inject,
  Ip,
  Optional,
  Session,
  SetMetadata,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { NestDecoratorService } from './nest_decorator.service';
import { CatchFilter } from './catch/catch.filter';
import { MetadataGuard } from './metadata/metadata.guard';

@Controller('nest-decorator')
@SetMetadata('roles', ['users'])
export class NestDecoratorController {
  constructor(private readonly nestDecoratorService: NestDecoratorService) {}
  @Inject('li')
  @Optional() //optional表示这个provider是可选的，就算在module中没有也不会报错，如果不使用opyional会报错
  aaaService: Record<string, any>;

  @Get()
  Hello() {
    console.log(this.aaaService);
    return 'Hello decorator';
  }
  @Get('filter')
  @UseFilters(CatchFilter) //使用filterAOP进行拦截，如果在当前路由中，有与filter中catch匹配的异常，那么就会进行拦截
  filter() {
    throw new HttpException('当前出现http错误', 400);
  }
  @SetMetadata('roles', ['admin'])
  @UseGuards(MetadataGuard)
  @Get('metadata')
  metadata() {
    return '获取metadata数据成功';
  }

  //获取请求头信息,可以传入你想获取参数，如果没有传入默认获取全部请求信息
  @Get('header')
  header(
    @Headers('accept') accept: string,
    @Headers() headers: Record<string, any>,
  ) {
    return headers;
  }

  //通过ip拿到ip请求
  @Get('ip')
  ip(@Ip() ip: string) {
    console.log(ip);
    return ip;
  }

  //获取用户session信息
  @Get('session')
  session(@Session() session) {
    if (!session.count) {
      session.count = 0;
    }
    session.count++;
    return session;
  }
}
