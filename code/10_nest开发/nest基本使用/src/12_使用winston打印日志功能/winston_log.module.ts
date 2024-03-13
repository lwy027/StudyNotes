import { Module } from '@nestjs/common';
import { WinstonLogController } from './winston_log.controller';

@Module({
  controllers: [WinstonLogController],
})
export class WinstonLogModule {}
