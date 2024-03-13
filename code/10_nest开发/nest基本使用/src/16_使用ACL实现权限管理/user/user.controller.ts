import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { EntityManager } from 'typeorm';
import { Permission } from './entities/permision.entity';
import { User } from './entities/user.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @InjectEntityManager()
  private manager: EntityManager;

  @Get('init')
  async init() {
    const permission1 = new Permission();
    permission1.name = 'create_aaa';
    permission1.desc = '新增 aaa';

    const permission2 = new Permission();
    permission2.name = 'update_aaa';
    permission2.desc = '修改 aaa';

    const permission3 = new Permission();
    permission3.name = 'remove_aaa';
    permission3.desc = '删除 aaa';

    const permission4 = new Permission();
    permission4.name = 'query_aaa';
    permission4.desc = '查询 aaa';

    const permission5 = new Permission();
    permission5.name = 'create_bbb';
    permission5.desc = '新增 bbb';

    const permission6 = new Permission();
    permission6.name = 'update_bbb';
    permission6.desc = '修改 bbb';

    const permission7 = new Permission();
    permission7.name = 'remove_bbb';
    permission7.desc = '删除 bbb';

    const permission8 = new Permission();
    permission8.name = 'query_bbb';
    permission8.desc = '查询 bbb';

    const user1 = new User();
    user1.username = '东东';
    user1.password = 'aaaaaa';
    user1.permissions = [permission1, permission2, permission3, permission4];

    const user2 = new User();
    user2.username = '光光';
    user2.password = 'bbbbbb';
    user2.permissions = [permission5, permission6, permission7, permission8];

    //保存当前用户对应的权限用户 user1有aaa的权限，user2有bbb的权限

    await this.manager?.save([user1, user2]);

    return '初始化用户及对应部门成员成功';
  }
  @Post('login')
  @UseGuards(ValidationPipe)
  async login(@Body() user: LoginDto, @Session() session) {
    const userInfo = await this.userService.login(user);

    console.log(userInfo);
    session.user = {
      username: user.name,
    };
    return 'succession';
  }
}
