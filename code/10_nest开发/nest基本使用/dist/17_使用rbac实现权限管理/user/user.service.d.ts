import { UserLoginDto } from './dto/userLogin.dto';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
export declare class UserService {
    private readonly entityManger;
    login(user: UserLoginDto): Promise<User>;
    findRolesByIds(rolesId: number[]): Promise<Role[]>;
}
