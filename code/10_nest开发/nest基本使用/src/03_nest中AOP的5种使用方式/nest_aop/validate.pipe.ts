import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    //判断当前的value是否可以转换成数字，如果可以 * 10返回，不可以抛出异常
    console.log(value);
    console.log(metadata.data);
    if (Number.isNaN(parseInt(value))) {
      //nest内部的ExceptionFiletr
      throw new BadRequestException(`参数${metadata.data}只能是字符串或者数字`);
    }
    return typeof value === 'number' ? value * 10 : parseInt(value) * 10;
  }
}
