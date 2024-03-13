import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private manger: EntityManager;

  async login(user: LoginDto) {
    const userInfo = await this.manger.findOneBy(User, {
      username: user.name,
    });

    if (!userInfo) {
      throw new HttpException('用户不存在', HttpStatus.ACCEPTED);
    }

    if (user.password !== userInfo.password!) {
      throw new HttpException('用户密码错误，请重新输入', HttpStatus.ACCEPTED);
    }

    return userInfo;
  }

  async findByUsername(username: string) {
    const user = await this.manger.findOne(User, {
      where: {
        username,
      },
      relations: {
        permissions: true,
      },
    });
    return user;
  }
}
