import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { Cookie } from 'express-session';

import * as cookieParse from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { Session } from '@nestjs/common';
// import { MyLogger } from './12_使用winston打印日志功能/src/MyLogger';
// import * as session from 'express-session';
//1.nest中AOP使用的5种方式
// import { NextFunction } from 'express';
// import { TimerInterceptor } from './03_nest中AOP的5种使用方式/nest_aop/timer.interceptor';
// import { ValidatePipe } from './03_nest中AOP的5种使用方式/nest_aop/validate.pipe';
// import { LoginGuard } from './03_nest中AOP的5种使用方式/nest_aop/login.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  //1.AOP使用方式一：使用middlewara全局中间件
  //app.use 等同于在 xxxModule 的 configure 方法里的 forRoutes('*')
  // app.use((req: Request, res: Response, next: NextFunction) => {
  //   console.log('before', req.url);
  //   next();
  //   console.log('after');
  // });

  //2.全局guard，这样前端在访问每一个路由时，都会经过这个guard
  //但是在这里使用有一个缺点：这里的guard类，没有被加入到IOC容器中，不可以被注入
  //所以可以在Module模块中使用
  // app.useGlobalGuards(new LoginGuard());

  //3.全局实现interceptor
  // app.useGlobalInterceptors(new TimerInterceptor());

  //4.全局pipe
  // app.useGlobalPipes(new ValidationPipe());
  //
  app.use(cookieParse());

  //设置session对象
  // app.use(
  //   session({
  //     secret: 'liweiye',
  //     cookie: { maxAge: 10000 },
  //   }),
  // );

  // app.useLogger(new MyLogger());
  // app.enableCors();
  // console.log('--');

  const config = new DocumentBuilder()
    .setTitle('test example')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('test')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);

  await app.listen(4000);
  // setTimeout(() => {
  //   app.close();
  // }, 3000);
}
bootstrap();
