import {
  Controller,
  Get,
  Header,
  HostParam,
  HttpCode,
  Next,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

//controllre可以有对象的写法，可以指定访问主机,可以发现只有host符合.0.0.1的host才可以访问
@Controller({ host: ':host.0.0.1', path: 'aaa' })
export class AaaController {
  @Get('bbb')
  host(@HostParam('host') a) {
    console.log(a);
    return a;
  }

  //获取请求信息
  @Get('ccc')
  ccc(@Req() req: Request) {
    console.log(req.hostname);
    console.log(req.url);
    return req.hostname;
  }

  //注入响应对象
  @Get('ddd')
  ddd(@Res({ passthrough: true }) res: Response) {
    console.log(res);
    // res.json('res数据响应成功');
    //使用@res不会把返回值作为响应内容，因为res继承于express所有可以使用res.end()返回，这样做时为了避免冲突
    //如果真的想使用return可以以通过 passthrough 参数告诉 Nest
    return 'dd';
  }

  //除了注入 @Res 不会返回响应外，注入 @Next 也不会：
  //当你有两个 handler 来处理同一个路由的时候，可以在第一个 handler 里注入 next，调用它来把请求转发到第二个 handler：
  @Get('eee')
  eee1(@Next() next: NextFunction) {
    console.log('handler1');
    //调用next执行下一个 eee路由
    next();
  }
  @Get('eee')
  eee2() {
    console.log('handler2');
    return '111';
  }

  // handler 默认返回的是 200 的状态码，你可以通过 @HttpCode 修改它：
  @Get('fff')
  @HttpCode(222)
  fff() {
    return 'hello';
  }

  //修改 response header，通过 @Header 装饰器：
  @Get('ggg')
  @Header('aaa', 'bbb')
  ggg() {
    return '请求头修改成功';
  }

  //过 @Redirect 装饰器来指定路由重定向的 url
  @Get('hhh')
  @Redirect('http://www.baidu.com')
  hhh() {}
  //获取在返回值的时候设置url
  @Get('iii')
  @Redirect()
  jump() {
    return {
      statusCodee: 302,
      url: 'http://www.baidu.com',
    };
  }
  //指定指定渲染用的模版引擎 @Render()
}
