import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
//如果不需要注入依赖，那可以写函数形式的 middleware，这时候和 Express 的 middleware 就没啥区别了。
//如果需要注入依赖，那就写 class 形式的 middleware，可以用 Nest 的依赖注入能力。
export class LogMiddleware implements NestMiddleware {
  //因为这时候并不知道你用的 express 还是 fastify，所以 request、response 是 any，手动标注下类型就好了：
  use(req: Request, res: Response, next: () => void) {
    console.log('before2', req.url);
    next();
    console.log('after2');
  }
}
