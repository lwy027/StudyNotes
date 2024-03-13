import { Controller, Get, Headers, Query, UseGuards } from '@nestjs/common';
import { Aaa, Bbb, MyQuery, Myheader, ccc } from './aaa.decorator';
import { AaaGuard } from './aaa.guard';

@Controller('custom-decorator')
export class CustomDecoratorController {
  @Get('aa')
  @Aaa('admin')
  @UseGuards(AaaGuard)
  aa() {
    return 'aa';
  }
  //使用applyDecorator，实现效果与上面一致
  @Bbb('bb', 'user')
  bb() {
    return 'bb';
  }

  //自定义参数修饰器
  @Get('cc')
  cc(@ccc() cc: string) {
    //返回值就是路由中的参数
    return cc;
  }

  //自定义参数修饰器实现header操作
  @Get('dd')
  dd(@Headers('accept') header1, @Myheader('accept') header2) {
    console.log(header1);
    console.log(header2);
    return 'ddd';
  }
  //自定义参数修饰器实现Query操作
  @Get('ee')
  ee(@MyQuery('name') www: string, @Query('age') age: number) {
    console.log(www);
    console.log(age);
    return 'eeee';
  }
}
