import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserLoginDto } from './dto/userLogin.dto';
import { EntityManager, In } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private readonly entityManger: EntityManager;

  //登录逻辑
  async login(user: UserLoginDto) {
    //查询数据库返回数据,并颁发token
    console.log(user);

    const userInfo = await this.entityManger.findOne(User, {
      where: {
        username: user.name,
      },
      relations: {
        roles: true,
      },
    });

    if (!userInfo) {
      throw new HttpException('当前用户不存在', HttpStatus.ACCEPTED);
    }
    if (user.password !== userInfo.password) {
      throw new HttpException('密码错误', HttpStatus.ACCEPTED);
    }

    return userInfo;
  }
  //根据当前jwt中用户的信息关联的角色信息，查询当前角色拥有的权限
  findRolesByIds(rolesId: number[]) {
    return this.entityManger.find(Role, {
      where: {
        id: In(rolesId),
      },
      relations: {
        permissions: true,
      },
    });
  }
}
