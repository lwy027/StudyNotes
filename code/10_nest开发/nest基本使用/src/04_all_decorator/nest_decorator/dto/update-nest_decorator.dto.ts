import { PartialType } from '@nestjs/mapped-types';
import { CreateNestDecoratorDto } from './create-nest_decorator.dto';

export class UpdateNestDecoratorDto extends PartialType(CreateNestDecoratorDto) {}
