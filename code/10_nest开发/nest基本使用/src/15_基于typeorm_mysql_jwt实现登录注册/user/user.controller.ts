import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginGuardGuard } from '../login-guard/login-guard.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Inject(JwtService)
  private jwtService: JwtService;
  @Post('register')
  register(@Body() user: RegisterDto) {
    console.log(user);
    return this.userService.register(user);
  }
  @Get('aaa')
  @UseGuards(LoginGuardGuard)
  aaa() {
    return '访问aaa接口成功';
  }
  @Post('login')
  async login(
    @Body(ValidationPipe) user: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const findUser = await this.userService.login(user);
    if (findUser) {
      //有当前用户进行token的颁发
      const token = await this.jwtService.signAsync({
        user: {
          id: findUser.id,
          username: findUser.name,
        },
      });
      res.setHeader('token', token);
      return '登录成功';
    } else {
      return '登录失败，请检查用户名或密码';
    }
  }
}
