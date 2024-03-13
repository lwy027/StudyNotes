import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class redisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  //1.获取
  //根据sid获取对应的session
  async hashGet(key: string) {
    return await this.redisClient.hGetAll(key);
  }

  //2.保存
  //保存sid,保存用得数据,过期时间
  //通过sid key获取,
  async hashSet(key: string, obj: Record<string, any>, ttl?: number) {
    for (const name in obj) {
      await this.redisClient.hSet(key, name, obj[name]);
    }

    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }
}
