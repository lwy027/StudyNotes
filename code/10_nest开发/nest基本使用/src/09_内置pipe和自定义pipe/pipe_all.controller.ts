import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ValidPipe } from './valid.pipe';
import { Person } from './dto/Person';
import { MyValidationPipePipe } from './my-validation-pipe.pipe';

@Controller('pipe-all')
export class PipeAllController {
  constructor() {}

  // @Get('int')
  // getHello(@Query('age', ParseIntPipe) age: number) {
  //   return age + 1;
  // }
  @Get('dd')
  dd(@Query('age', ValidPipe) age: number) {
    return age;
  }
  @Get(':bb')
  bb(@Param('bb') bb: string) {
    return bb;
  }
  //更改状态码和使用自定义exceptor filter
  @Get('int')
  getHello(
    @Query(
      'age',
      new ParseIntPipe({
        //自定义状态码
        // errorHttpStatusCode: HttpStatus.BAD_GATEWAY,
        //自定义返回exceptor filter
        exceptionFactory(msg) {
          console.log(msg);
          throw new HttpException('参数类型错误' + msg, HttpStatus.ACCEPTED);
        },
      }),
    )
    age: number,
  ) {
    return age + 1;
  }

  //参数默认值
  @Get('cc')
  cc(@Query('cc', new DefaultValuePipe('nnnn')) kk: string) {
    return kk;
  }

  //post请求验证
  @Post('login')
  login(@Body(new MyValidationPipePipe()) person: Person) {
    console.log(person);
    return person;
  }
}
