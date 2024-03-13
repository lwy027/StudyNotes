import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
export declare class JwtController {
    jwtService: JwtService;
    jwt(res: Response): string;
    login(authorization: string, res: Response): number;
}
