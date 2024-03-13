import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { AaaService } from './aaa.service';

@Injectable()
export class BbbService {
  constructor(
    @Inject(forwardRef(() => AaaService))
    private readonly aaaSerice: AaaService,
  ) {}
  bbb() {
    return this.aaaSerice.aaa() + 'bbb';
  }
}
