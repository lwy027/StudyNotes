import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepository;
    register(user: RegisterDto): Promise<"注册成功" | "注册失败">;
    login(user: LoginDto): Promise<User>;
}
