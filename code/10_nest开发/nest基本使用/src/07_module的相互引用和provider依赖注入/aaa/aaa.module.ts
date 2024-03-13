import { Module, forwardRef } from '@nestjs/common';
import { BbbModule } from '../bbb/bbb.module';
import { AaaController } from '../aaa.controller';
import { AaaService } from '../aaa.service';
import { BbbService } from '../bbb.service';

@Module({
  //2个不同模块相互之间直接引用会报错，这是因为在nest初始化时
  //会先执行imports中的模块执行
  //但是现在因为Bbbmodule模块也引用这Aaamodule，所有就会报错，因为2个模块都还没有进行初始化
  // imports: [BbbModule],

  //可以使用forwardRef()函数解决这种情况
  //它的作用就是告诉nest你先帮我创建模块之后在执行forwardRef里面的模块
  imports: [forwardRef(() => BbbModule)],
  controllers: [AaaController],
  providers: [AaaService, BbbService],
})
export class AaaModule {}
