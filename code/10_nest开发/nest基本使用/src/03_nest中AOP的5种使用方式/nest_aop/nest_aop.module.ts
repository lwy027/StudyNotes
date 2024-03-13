import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NestAopService } from './nest_aop.service';
import { NestAopController } from './nest_aop.controller';
import { LogMiddleware } from './log.middleware';
// import { LoginGuard } from './login.guard';
import { TimerInterceptor } from './timer.interceptor';
import { ValidatePipe } from './validate.pipe';

@Module({
  controllers: [NestAopController],
  providers: [
    NestAopService,
    // {
    //   //1.这种使用方式可以把guard放在IOC中，这样在Guard中就可以进行依赖注入
    //全局都可以使用
    //   provide: 'APP_GUARD', 全局实现的时候，provide的名字必须是APP_GUARD
    //   useClass: LoginGuard,
    // },
    //2.全局实现interceptor
    {
      provide: 'APP_INTERCEPTOR', //全局实现的时候，provide的名字必须是APP_INTERCEPTOR
      useClass: TimerInterceptor,
    },
    {
      provide: 'APP_PIPE', //全局实现的时候，provide的名字必须是APP_PIPE
      useClass: ValidatePipe,
    },
  ],
})
export class NestAopModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //订阅的全局中间件，并且决定哪一个路由使用这个中间件
    consumer.apply(LogMiddleware).forRoutes('aaa*');
  }
}
