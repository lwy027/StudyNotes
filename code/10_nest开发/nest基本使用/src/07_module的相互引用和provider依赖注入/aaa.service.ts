import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { BbbService } from './bbb.service';

@Injectable()
export class AaaService {
  //如果provideer不使用forwardRef进行调用provider也会造成循环引用问题
  //这是因为在代码初始化时，还没有把BbbService添加到IOC容器中，所有就会进行依赖报错
  //使用forwardRef就会等把BbbService加入之后在执行对应的操作,这样就解决了循环依赖的问题
  constructor(
    @Inject(forwardRef(() => BbbService))
    private readonly bbbService: BbbService,
  ) {}

  aaa() {
    return this.bbbService.bbb() + 'aaa';
  }
}
