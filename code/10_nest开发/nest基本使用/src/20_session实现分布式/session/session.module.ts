import { Global, Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { sessionController } from './session.controlller';

@Global()
@Module({
  controllers: [sessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
