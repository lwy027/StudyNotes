import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonService {
  findAll() {
    return `This action returns all person`;
  }
}
