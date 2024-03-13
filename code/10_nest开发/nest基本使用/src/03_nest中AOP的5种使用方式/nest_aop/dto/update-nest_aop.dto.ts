import { PartialType } from '@nestjs/mapped-types';
import { CreateNestAopDto } from './create-nest_aop.dto';

export class UpdateNestAopDto extends PartialType(CreateNestAopDto) {}
