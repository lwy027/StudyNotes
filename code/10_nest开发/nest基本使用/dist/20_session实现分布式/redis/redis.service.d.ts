export declare class redisService {
    private redisClient;
    hashGet(key: string): Promise<{
        [x: string]: string;
    }>;
    hashSet(key: string, obj: Record<string, any>, ttl?: number): Promise<void>;
}
