import { UserDto } from './dto/user.dto';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UserService {
    entityManger: EntityManager;
    regisetr(registerUser: UserDto): Promise<UserDto & User>;
    login(loginUser: UserDto): Promise<User>;
    findUserById(userId: number): Promise<User>;
}
