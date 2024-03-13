import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MyLogger } from './MyLogger';
const multer = require('multer');
@Controller('file-slice')
export class FileSliceController {
  //文件拦截器
  @Post('aaa')
  @UseInterceptors(
    FilesInterceptor('avator', 3, {
      dest: 'uploads',
      storage: multer.diskStorage({
        destination(req, file, callback) {
          //参数一：是否有错误，参数二：写入文件地址
          callback(null, 'uploads');
        },
        filename(req, file, cb) {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  )
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log('files', files);
    console.log('body', body);

    //把拿到的分片移动到单独的目录
    return '文件上传成功';
  }
  static ll = 'lwy';

  private logger = new Logger();

  @Inject(MyLogger)
  private mylogger: MyLogger;
  //打印日志
  @Get('print')
  print() {
    this.logger.debug('这是一个显而易见的错误', FileSliceController.name);
    this.logger.error('error', FileSliceController.name);
    this.logger.fatal('fatal', FileSliceController.name);
    this.logger.log('fatal', FileSliceController.name);
    this.logger.warn('warn', FileSliceController.name);
    this.logger.verbose('verbose', FileSliceController.name);

    console.log('------');

    this.mylogger.log('自定义日志', FileSliceController.name);
  }
}
