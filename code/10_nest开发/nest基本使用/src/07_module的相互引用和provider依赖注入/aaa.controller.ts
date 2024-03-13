import { Controller, Get } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { BbbService } from './bbb.service';

@Controller('aaa')
export class AaaController {
  constructor(
    private readonly aaaService: AaaService,
    private readonly bbbService: BbbService,
  ) {}
  @Get('aaa')
  aaa() {
    return this.aaaService.aaa() + this.bbbService.bbb();
  }
}
