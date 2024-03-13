import { HttpException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
function md5(str: string) {
  //1.使用md5加密算法
  const hash = crypto.createHash('md5');

  return hash.update(str).digest('hex');
}

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  async register(user: RegisterDto) {
    //1.查询数据库判断用户是否存在
    const findUser = await this.userRepository.findOneBy({
      name: user.username,
    });
    if (findUser) {
      throw new HttpException('用户已存在', 200);
    }
    //2.如果不存在注册保存当前用户对密码进行加密
    const newUser = new User();
    newUser.name = user.username;
    newUser.password = md5(user.password);

    try {
      //保存用户
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (error) {
      console.log(error);
      return '注册失败';
    }
  }

  async login(user: LoginDto) {
    //登录需要查询数据库，第一次登录时进行token的颁发

    const findUser = await this.userRepository.findOneBy({
      name: user.username,
    });
    if (!findUser) {
      throw new HttpException('用户名不存在', 200);
    }
    if (findUser.password !== md5(user.password)) {
      throw new HttpException('密码错误', 200);
    }

    return findUser;
  }
}
