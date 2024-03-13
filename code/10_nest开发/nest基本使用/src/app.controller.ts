import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './22_使用prisma/prisma.service';

//AppController 声明了 @Controller，代表这个 class 可以被注入，nest 也会把它放到 IoC 容器里。
//Controller 只需要被注入，所以 nest 单独给它加了 @Controller 的装饰器。
@Controller()
export class AppController {
  //构造器注入,使用构造器注入可以不使用@Inject()指定token，但是如果指定provide为一个字符串则需要指定@Inject()中的token
  constructor(
    private readonly appService: AppService,
    @Inject('person') private readonly person: { name: string; age: number },
    @Inject('person2') private readonly person2: { name: string; desc: string },
    @Inject('person3') private readonly person3: { name: string; desc: string },
    @Inject('person4') private readonly person4: { name: string; desc: string },
    @Inject('person5') private readonly person5: { name: string; desc: string },
  ) {}
  // constructor() {}
  //属性注入
  //使用inject注入参数是提供provide的toekn
  // @Inject(AppService)
  // private appService: AppService;

  @Inject(PrismaService)
  private prisma: PrismaService;

  @Get()
  async create() {
    const id = await this.prisma.department.create({
      data: {
        name: '技术部',
      },
      select: {
        id: true,
      },
    });
    const employee = await this.prisma.employee.create({
      data: {
        name: '张三',
        phone: '192929',
        department: {
          connect: id,
        },
      },
      select: {
        id: true,
        name: true,
        phone: true,
      },
    });

    return {
      id,
      employee,
    };
  }
  @Get()
  getHello() {
    // console.log(this.person);
    // console.log(this.person2);
    // console.log(this.person3);
    // console.log(this.person4);
    // console.log(this.person5);
    return this.appService.getHello();
  }
}
