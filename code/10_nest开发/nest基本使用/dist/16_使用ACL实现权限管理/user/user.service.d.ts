import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private manger;
    login(user: LoginDto): Promise<User>;
    findByUsername(username: string): Promise<User>;
}
