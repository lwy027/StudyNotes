import { Global, Module } from '@nestjs/common';
import { redisService } from './redis.service';
import { createClient } from 'redis';
@Global()
@Module({
  providers: [
    redisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });
        await client.connect();
        return client;
      },
    },
  ],
  exports: [redisService],
})
export class RedisModule {}
