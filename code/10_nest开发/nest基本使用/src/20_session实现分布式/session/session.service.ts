import { Inject, Injectable } from '@nestjs/common';
import { redisService } from '../redis/redis.service';

@Injectable()
export class SessionService {
  @Inject(redisService)
  redisService: redisService;

  //session中做的操作
  /**
   * 1.通过传来的cookie中的sid调用hashget方法获取对应的数据
   * 2.使用redis设置session
   * 下面实现一个计数功能
   */

  async getSession<SessionType extends Record<string, any>>(
    sid: string,
  ): Promise<SessionType>;
  async getSession(sid: string) {
    return await this.redisService.hashGet(`sid_${sid}`);
  }
  async setSession(
    sid: string,
    value: Record<string, any>,
    ttl: number = 30 * 60,
  ) {
    if (!sid) {
      sid = this.generateSid();
    }
    await this.redisService.hashSet(`sid_${sid}`, value, ttl);
    return sid;
  }

  generateSid() {
    return Math.random().toString().slice(2, 12);
  }
}
