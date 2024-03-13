import { Module } from '@nestjs/common';
import { PipeAllController } from './pipe_all.controller';

@Module({
  controllers: [PipeAllController],
  providers: [],
})
export class PipeAllModule {}
