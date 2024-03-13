import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ValidPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
