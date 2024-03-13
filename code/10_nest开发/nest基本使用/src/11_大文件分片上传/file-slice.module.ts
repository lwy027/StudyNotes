import { Module } from '@nestjs/common';
import { FileSliceController } from './file-slice.controller';
import { MyLogger } from './MyLogger';

@Module({
  controllers: [FileSliceController],
  providers: [MyLogger],
})
export class FileSliceModule {}
