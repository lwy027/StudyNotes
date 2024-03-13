import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { City } from './entities/city.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  //实例管理
  private manager: EntityManager;

  //指定实体
  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(City)
  private cityRepository: Repository<City>;

  create(createUserDto: CreateUserDto) {
    console.log('---');
    return this.manager.save(User, createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.find({
      where: { id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.save({
      id,
      ...updateUserDto,
    });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async getCity() {
    //1.创建城市
    const parentCity = new City();
    parentCity.name = '华南';
    await this.cityRepository.save(parentCity);
    //2.创建子城市并且指定父节点
    const childCity1 = new City();
    childCity1.name = '云南';
    const parent1 = await this.cityRepository.findOne({
      where: {
        name: '华南',
      },
    });
    if (parent1) {
      childCity1.parent = parent1;
    }
    //2.1保存子节点
    await this.cityRepository.save(childCity1);

    const childCity2 = new City();
    childCity2.name = '昆明';
    const parent2 = await this.cityRepository.findOne({
      where: {
        name: '昆明',
      },
    });
    if (parent2) {
      childCity2.parent = parent2;
    }
    await this.cityRepository.save(childCity2);
    //3.返回查询关系
    return await this.manager.getTreeRepository(City).countAncestors(parent1);
  }
}
