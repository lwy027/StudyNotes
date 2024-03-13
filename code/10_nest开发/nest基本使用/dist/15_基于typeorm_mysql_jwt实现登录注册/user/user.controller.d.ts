import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    private jwtService;
    register(user: RegisterDto): Promise<"注册成功" | "注册失败">;
    aaa(): string;
    login(user: LoginDto, res: Response): Promise<"登录成功" | "登录失败，请检查用户名或密码">;
}
