import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginGuard } from '../login.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Inject(JwtService)
  jwtService: JwtService;

  @Post('register')
  async register(@Body() user: UserDto) {
    return await this.userService.regisetr(user);
  }

  @Post('login')
  async login(@Body() user: UserDto) {
    //1.查询当前用户
    const curUser = await this.userService.login(user);

    //2.登录时进行token的颁发，注意这里颁发的是双token,
    //access_token:用户登录认证的token
    //refresh_token:只要access_token过期了而refresh_token没有过期，就会根据refresh刷新
    //可以提高安全性和实现无限续签
    //只要不超过 7 天未访问系统，就可以一直是登录状态，可以无限续签，不需要登录。

    const access_toekn = this.jwtService.sign(
      {
        userId: curUser.id,
        userName: curUser.username,
      },
      { expiresIn: '30m' },
    );
    //保存id是因为refresh只是为了刷新taccess_token，客户端不需要使用,只需要使用id获取用户信息重新颁发token
    const refresh_toekn = this.jwtService.sign(
      {
        userId: curUser.id,
      },
      {
        expiresIn: '7d',
      },
    );

    return {
      access_toekn,
      refresh_toekn,
    };
  }
  @UseGuards(LoginGuard)
  @Get('aaa')
  aaa() {
    return '获取aaaa成功';
  }

  //使用refresh_token刷新token
  @Get('refresh_token')
  async refresh(@Query('refresh_token') refreshToken: string) {
    //1.进行refresh_token验证
    const data = this.jwtService.verify(refreshToken);
    //2.通过id重新查询用户进行tokebn颁发
    const user = await this.userService.findUserById(data.userId);
    const access_token = this.jwtService.sign(
      {
        userId: user.id,
        username: user.username,
      },
      {
        expiresIn: '30m',
      },
    );

    const refresh_token = this.jwtService.sign(
      {
        userId: user.id,
      },
      {
        expiresIn: '7d',
      },
    );

    return {
      access_token,
      refresh_token,
    };
  }
  catch(e) {
    console.log(e);
    throw new UnauthorizedException('token 已失效，请重新登录');
  }
}
