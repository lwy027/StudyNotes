import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private manager;
    private userRepository;
    private cityRepository;
    create(createUserDto: CreateUserDto): Promise<CreateUserDto & User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User[]>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        id: number;
    } & User>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    getCity(): Promise<number>;
}
