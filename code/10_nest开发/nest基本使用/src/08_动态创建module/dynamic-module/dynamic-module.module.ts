import { DynamicModule, Module } from '@nestjs/common';
import { DynamicModuleService } from './dynamic-module.service';
import { DynamicModuleController } from './dynamic-module.controller';

@Module({
  // controllers: [DynamicModuleController],
  // providers: [DynamicModuleService],
})
export class DynamicModuleModule {
  //我们给 DynamicModuleModule 加一个 register 的静态方法，返回模块定义的对象。
  //和在装饰器里定义的时候的区别，只是多了一个 module 属性
  //外界调用这个静态方法，在传入options就可以实现动态模块
  static register(options: Record<string, any>): DynamicModule {
    return {
      //自定义方法实现module时，需要指定module属性
      module: DynamicModuleModule,
      controllers: [DynamicModuleController],
      providers: [
        //这里的useValue使用外界传来的参数，实现了动态创建module
        { provide: 'CONFIG_OPTIONS', useValue: options },
        DynamicModuleService,
      ],
      exports: [],
    };
  }
}
