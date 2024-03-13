import { Injectable } from '@nestjs/common';

@Injectable()
export class NestAopService {
  findAll() {
    return `This action returns all nestAop`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nestAop`;
  }

  remove(id: number) {
    return `This action removes a #${id} nestAop`;
  }
}
