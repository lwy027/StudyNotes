import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    private manager;
    init(): Promise<string>;
    login(user: LoginDto, session: any): Promise<string>;
}
