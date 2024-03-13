import {
  Body,
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  // UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  //FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
// import multer from 'multer';
const multer = require('multer');
@Controller('upload')
export class UploadController {
  @Post('aaa')
  @UseInterceptors(
    FilesInterceptor('avator', 3, {
      dest: 'upload',
      storage: multer.diskStorage({
        destination(req, file, callback) {
          //参数一：是否有错误，参数二：写入文件地址
          callback(null, 'upload');
        },
        filename(req, file, cb) {
          console.log(file);
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  )
  upload(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 3000 })],
      }),
    )
    file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('body', body);
    console.log('file', file);
    return '文件上传成功';
  }
}
