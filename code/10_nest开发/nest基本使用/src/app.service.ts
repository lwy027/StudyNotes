import { Inject, Injectable } from '@nestjs/common';
// import { RedisClientType } from 'redis';
//因为 Service 是可以被注入也是可以注入到别的对象的，所以用 @Injectable 声明。
@Injectable()
export class AppService {
  @Inject('REDIS_CLIENT')
  // private redisClient: RedisClientType;
  async getHello() {
    // const value = await this.redisClient.keys('*');

    // console.log(value);
    return 'Hello World!';
  }
}
