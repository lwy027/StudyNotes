import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class MyValidationPipePipe implements PipeTransform {
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
}
