import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //intercepter和guard都可以获取对应的controller和handle
    //middleware不可以
    console.log(context.getClass(), context.getHandler());

    const startTimer = Date.now();
    //next.handle()可以调用目标controller
    return next.handle().pipe(
      //Controller 之前之后的处理逻辑可能是异步的。Nest 里通过 rxjs 来组织它们，所以可以使用 rxjs 的各种 operator。
      tap(() => {
        console.log('timer:', Date.now() - startTimer);
      }),
    );
  }
}
