import {
  Controller,
  Get,
  Inject,
  Res,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
@Controller('jwt')
export class JwtController {
  @Inject(JwtService)
  jwtService: JwtService;

  @Get('register')
  jwt(@Res({ passthrough: true }) res: Response) {
    //1.第一次请求时颁发token设置jwt

    const newToken = this.jwtService.sign({
      count: 1,
    });

    res.setHeader('token', newToken);

    return '颁发token成功';
  }

  @Get('login')
  login(
    @Headers('authorization') authorization: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    //1.进行判断当前用户是否有token,如果有则吧传送数据++,没有返回1

    if (authorization) {
      try {
        const token = authorization.split(' ')[1];
        //取出token
        const data = this.jwtService.verify(token);

        //把token中的count++,重写颁发token
        const newtoken = this.jwtService.sign({
          count: data.count++,
        });

        //重新设置请求头
        res.setHeader('token', newtoken);
        return data.count++;
      } catch (error) {
        console.log(error);
        throw new UnauthorizedException();
      }
    } else {
      const newToken = this.jwtService.sign({
        count: 1,
      });

      res.setHeader('token', newToken);
      return 1;
    }
  }
}
