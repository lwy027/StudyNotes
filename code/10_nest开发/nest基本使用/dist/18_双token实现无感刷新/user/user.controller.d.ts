import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    jwtService: JwtService;
    register(user: UserDto): Promise<UserDto & import("./entities/user.entity").User>;
    login(user: UserDto): Promise<{
        access_toekn: string;
        refresh_toekn: string;
    }>;
    aaa(): string;
    refresh(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    catch(e: any): void;
}
