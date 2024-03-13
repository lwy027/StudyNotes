import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
//作用和validationPipe一致
export class MyValidationPipePipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    //如果没有dto直接就没有办法进行转换验证直接返回
    if (!metatype) {
      return validate;
    }
    console.log(value);
    //拿到当前参数对象
    console.log(metatype);
    //参数对象通过 class-transformer 转换为 dto 类的对象
    const obj = plainToInstance(metatype, value);
    //用 class-validator 包来对这个对象做验证
    const errors = await validate(obj);
    //如果有错则抛出异常
    if (errors.length > 0) {
      throw new BadRequestException('参数验证失败');
    }
    return value;
  }
}
