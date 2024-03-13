import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('aaa')
export class AaaController {
  @Inject(ConfigService)
  configService: ConfigService;

  @Get()
  aa() {
    console.log('---');
    return {
      aaa: this.configService.get('aaa'),
      bbb: this.configService.get('bbb'),
    };
  }
  @Get('db')
  bb() {
    return {
      db: this.configService.get('db'),
    };
  }
}
