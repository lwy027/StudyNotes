import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { SessionModule } from './20_session实现分布式/session/session.module';
// import { SwaggerModule } from './21_swagger的基本使用/swagger.module';
// import { AaaModule } from './19_区分不同的配置文件/aaa/aaa.module';
// import path from 'path';
// import { UserModule } from './18_双token实现无感刷新/user/user.module';
// import { UserModule } from './17_使用rbac实现权限管理/user/user.module';
// import { AaaModule } from './17_使用rbac实现权限管理/aaa/aaa.module';
// import { BbbModule } from './17_使用rbac实现权限管理/bbb/bbb.module';
import { PrismaService } from './22_使用prisma/prisma.service';
import { UserModule } from './15_基于typeorm_mysql_jwt实现登录注册/user/user.module';
// import { APP_GUARD } from '@nestjs/core';
// import { LoginGuard } from './17_使用rbac实现权限管理/login.guard';
// import { PermissionGuard } from './17_使用rbac实现权限管理/permission.guard';
// import { LoginGuard } from './16_使用ACL实现权限管理/login.guard';
// import { UserModule } from './16_使用ACL实现权限管理/user/user.module';
// import { AaaModule } from './16_使用ACL实现权限管理/aaa/aaa.module';
// import { BbbModule } from './16_使用ACL实现权限管理/bbb/bbb.module';

// import { JwtModule } from './14_在nest中使用jwt/jwt.module';
// import { UserModule } from './15_基于typeorm_mysql_jwt实现登录注册/user/user.module';
// import { CustomDecoratorModule } from './06_自定义装饰器/custom-decorator.module';
// import { AaaModule } from './07_module的相互引用和provider依赖注入/aaa/aaa.module';
// import { DynamicModuleModule } from './08_动态创建module/dynamic-module/dynamic-module.module';
// import { PipeAllModule } from './09_内置pipe和自定义pipe/pipe_all.module';
// import { UploadModule } from './10_nest中实现文件上传/upload.module';
// import { FileSliceModule } from './11_大文件分片上传/file-slice.module';
// import { WinstonLogModule } from './12_使用winston打印日志功能/winston_log.module';
// import { NestDecoratorModule } from './04_all_decorator/nest_decorator/nest_decorator.module';
// import { EcontextModule } from './05_executionContext切换不同的上下文/econtext.module';

// import { NestAopModule } from './03_nest中AOP的5种使用方式/nest_aop/nest_aop.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserModule } from './13_在nest中使用typeorm/user.module';
// import { User } from './13_在nest中使用typeorm/entities/user.entity';
// import { City } from './13_在nest中使用typeorm/entities/city.entity';
// import { AaaModule } from './aaa/aaa.module';

@Module({
  //nest中的装饰器
  // imports: [NestDecoratorModule],

  //executionContext切换不同的上下文
  // imports: [EcontextModule],
  //自定义装饰器
  // imports: [CustomDecoratorModule],
  //module的相互引用和provider相互依赖问题
  // imports: [AaaModule],
  //动态创建模块
  // imports: [DynamicModuleModule.register({ aaa: 'aaa', bbb: 'bbb' })],
  //所有pipe验证
  // imports: [PipeAllModule],
  //上传文件
  // imports: [UploadModule],
  //大文件分片上传
  // imports: [FileSliceModule],

  //使用winston打印日志功能
  // imports: [WinstonLogModule],

  //使用typeorm操作数据库
  // imports: [
  //   UserModule,
  //   TypeOrmModule.forRoot({
  //     type: 'mysql',
  //     host: 'localhost',
  //     port: 3306,
  //     username: 'root',
  //     password: 'Liweiye123456',
  //     database: 'typeorm_test',
  //     synchronize: true,
  //     logging: true,
  //     //   entities: [User, IdCard],
  //     //   entities: [Department, Employee],
  //     entities: [User, City],
  //     migrations: [],
  //     subscribers: [],
  //     connectorPackage: 'mysql2',
  //     extra: {
  //       authPlugin: 'sha256_password',
  //     },
  //   }),
  // ],

  //基于jwt实现token
  // imports: [JwtModule],
  //基于typeorm,jwy,mysql实现登录注册功能
  // // imports: [UserModule],
  // imports: [UserModule, AaaModule, BbbModule],

  //基于tbac实现权限管理
  // imports: [UserModule, AaaModule, BbbModule],
  // imports: [UserModule, AaaModule],

  //多环境配置
  // imports: [AaaModule],

  // imports: [SessionModule],

  //使用swagger
  // imports: [SwaggerModule],

  // imports: [UserModule],

  controllers: [AppController], //表示只能被注入

  providers: [
    PrismaService,
    {
      provide: AppService,
      //provide: 'app_service', //1.指定token,token可以是一个字符串，也可以是一个类,如果是一个字符串，我们在使用时，需要手动指明注入
      useClass: AppService, //指定类
    }, //这种写法等于单独写一个AppService，相当于{provide:AppService,useClass:AppService}
    {
      provide: 'person',
      useValue: {
        //2.usevalue创建provider
        name: '小明',
        age: 20,
      },
    },
    {
      provide: 'person2',
      useFactory() {
        //3.使用useFactory动态创建对象
        return { desc: 'aaa', name: 'ccc' };
      },
    },
    {
      provide: 'person3',
      useFactory(person: { name: string }, appService: AppService) {
        //4.通过参数注入其他，provider
        return { desc: appService.getHello(), name: person.name };
      },
      inject: ['person', AppService],
    },
    {
      provide: 'person5',
      async useFactory(person: { name: string }, appService: AppService) {
        //5.异步使用
        await new Promise((resolve) => {
          setTimeout(resolve, 3000);
        });
        return { desc: appService.getHello(), name: person.name };
      },
      inject: ['person', AppService],
    },
    {
      provide: 'person4',
      useExisting: 'person2', //起别名,这里就是给 person2 的 token 的 provider 起个新的 token 叫做 person4。
    },

    // {
    //   provide: 'REDIS_CLIENT',
    //   async useFactory() {
    //     const client = createClient({
    //       socket: {
    //         host: 'localhost',
    //         port: 6379,
    //       },
    //     });
    //     await client.connect();
    //     return client;
    //   },
    // },

    //总结：provide相当于给依赖注入的名字，useClass 的方式由 IoC 容器负责实例化
    //useValue，useFactory 直接创建对象，useExisting可以给存在的provider起一个别名
    // {
    //   provide: APP_GUARD,
    //   useClass: LoginGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: PermissionGuard,
    // },
  ], //表示可以被注入，也可以注入别的对象
})
export class AppModule {}
