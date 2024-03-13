import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ name: 'xxx' })
  name: string;
  age: number;
}
