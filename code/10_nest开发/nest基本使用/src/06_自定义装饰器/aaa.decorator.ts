import {
  ExecutionContext,
  Get,
  SetMetadata,
  UseGuards,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common';
import { AaaGuard } from './aaa.guard';
import { Request } from 'express';

//方法装饰器，主要内置一些nest自己封装的装饰器
export const Aaa = (...args: string[]) => SetMetadata('aaa', args);

//applyDecorators可以组合多个装饰器
export function Bbb(path: string, role: string) {
  return applyDecorators(
    Get(path),
    UseGuards(AaaGuard),
    SetMetadata('bbb', role),
  );
}

//自定义参数装饰器，用于路由参数

export const ccc = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    console.log(data);
    console.log(context);
    return 'ccc';
  },
);
//自定义headers
export const Myheader = createParamDecorator(
  /**
   *
   * @param key 外界传来的参数
   * @param context 可以获取当前的请求上下文
   * @returns
   */
  (key: string, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    return key ? request.headers[key.toLowerCase()] : request.headers;
  },

  //自定义实现Query
);

export const MyQuery = createParamDecorator(
  (key: string, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    //直接调用query方法
    return request.query[key];
  },
);
