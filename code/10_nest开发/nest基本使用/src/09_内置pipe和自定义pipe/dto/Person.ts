import { IsInt } from 'class-validator';

export class Person {
  name: string;
  @IsInt()
  age: number;
  sex: string;
}
