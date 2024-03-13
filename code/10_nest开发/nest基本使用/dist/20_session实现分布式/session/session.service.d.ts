import { redisService } from '../redis/redis.service';
export declare class SessionService {
    redisService: redisService;
    getSession<SessionType extends Record<string, any>>(sid: string): Promise<SessionType>;
    setSession(sid: string, value: Record<string, any>, ttl?: number): Promise<string>;
    generateSid(): string;
}
