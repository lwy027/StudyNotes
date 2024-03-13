import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

//catch指定要处理的异常类型，当在路由中有返回这样的异常时，在这里就会进行一次拦截
@Catch(HttpException)
export class CatchFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();

    console.log('--', exception.getStatus());
    response.status(exception.getStatus()).json({
      message: exception.message,
    });
  }
}
