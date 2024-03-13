import { UserService } from './user.service';
import { UserLoginDto } from './dto/userLogin.dto';
import { EntityManager } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    entityManager: EntityManager;
    jwtService: JwtService;
    initData(): Promise<void>;
    login(userInfo: UserLoginDto): Promise<{
        code: number;
        token: string;
    }>;
}
