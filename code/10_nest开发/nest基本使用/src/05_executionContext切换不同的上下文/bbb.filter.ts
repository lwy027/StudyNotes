import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { MyException } from './MyException';

@Catch(MyException)
export class BbbFilter<MyException> implements ExceptionFilter {
  /**
   *为了让 Filter、Guard、Exception Filter 支持 http、ws、rpc 等场景下复用，
   Nest 设计了 ArgumentHost 和 ExecutionContext 类。
   * @param exception 与之关联处理异常信息的类
   * @param host ArgumentsHost可以根据不同的请求上下文，进行识别判断做不同的操作
   * ArgumentHost 可以通过 getArgs 或者 getArgByIndex 拿到上下文参数，比如 request、response、next 等。
   * 更推荐的方式是根据 getType 的结果分别 switchToHttp、switchToWs、swtichToRpc，然后再取对应的 argument。
   */
  catch(exception: MyException, host: ArgumentsHost) {
    console.log(exception);
    if (host.getType() == 'http') {
      const ctx = host.switchToHttp();
      //获取请求对象
      const request = ctx.getRequest<Request>();
      //获取响应对象
      const response = ctx.getRequest<Response>();

      console.log(request);
      //返回响应信息
      response.status(400).json({
        // a: exception.aaa,
        // b: exception.bbb,
      });
    } else if (host.getType() === 'ws') {
    } else if (host.getType() === 'rpc') {
    }
    debugger;
  }
}
