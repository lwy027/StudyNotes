import { IsNotEmpty, Length } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @Length(1, 50)
  name: string;
  @IsNotEmpty()
  @Length(1, 50)
  password: string;
}
