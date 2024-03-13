import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { UserDto } from './dto/User.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('swagger')
export class SwaggerController {
  @ApiOperation({ summary: '测试aaa', description: 'aaa描述' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'aaa请求成功',
    type: String,
  })
  @Get('aaa')
  aaa() {
    return 'success';
  }

  @ApiQuery({
    name: 'a1',
    type: String,
    description: 'a1 param',
    required: false,
    example: '1111',
  })
  @ApiQuery({
    name: 'a2',
    type: String,
    description: 'a2 param',
    required: false,
    example: '1111',
  })
  @Get('bbb')
  bbb(@Query('a1') a1: string, @Query('a2') a2: string) {
    return {
      a1,
      a2,
    };
  }

  @ApiBody({
    type: UserDto,
  })
  @Post('ccc')
  ccc(@Body() user: UserDto) {
    return user;
  }
}
