import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  entityManger: EntityManager;

  regisetr(registerUser: UserDto) {
    //保存当前用户信息
    return this.entityManger.save(User, registerUser);
  }

  async login(loginUser: UserDto) {
    //查询数据库，如果存在就返回

    const user = await this.entityManger.findOne(User, {
      where: {
        username: loginUser.username,
      },
    });

    if (!user) {
      throw new HttpException('当前用户不存在请重新输入', HttpStatus.ACCEPTED);
    }
    if (user.password !== user.password) {
      throw new HttpException(
        '当前用户密码错误，请重新输入',
        HttpStatus.ACCEPTED,
      );
    }

    return user;
  }
  async findUserById(userId: number) {
    return await this.entityManger.findOne(User, {
      where: {
        id: userId,
      },
    });
  }
}
