import { Controller, Get, Logger } from '@nestjs/common';

@Controller('winston-log')
export class WinstonLogController {
  private logger = new Logger();
  @Get()
  winston() {
    this.logger.log('log', WinstonLogController.name);
    return 'hello winston_log';
  }
}
