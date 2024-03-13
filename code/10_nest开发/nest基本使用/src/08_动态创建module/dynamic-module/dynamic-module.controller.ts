import { Controller, Get, Inject } from '@nestjs/common';
import { DynamicModuleService } from './dynamic-module.service';

@Controller('dynamic-module')
export class DynamicModuleController {
  constructor(private readonly dynamicModuleService: DynamicModuleService) {}

  @Inject('CONFIG_OPTIONS')
  configOptions: Record<string, any>;

  @Get('dynamic')
  Aaa() {
    console.log(this.configOptions);
    return '实现DynamicModule';
  }
}
