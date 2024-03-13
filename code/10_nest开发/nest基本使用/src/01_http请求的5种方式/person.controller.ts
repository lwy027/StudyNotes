import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
const multer = require('multer');

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}
  //2.获取query数据
  @Get('query')
  getQuery(@Query('name') name: string, @Query('age') age: number) {
    return `获取uery数据成功姓名${name}-年龄${age}`;
  }

  //1.获取parmas数据
  @Get(':id')
  getParams(@Param('id') id: string) {
    return `获取params数据成功${id}`;
  }

  //3.获取urlencode数据
  @Post('urlencode')
  getUrlEncode(@Body() createPersonDot: CreatePersonDto) {
    return `获取urlEncode数据成功姓名${createPersonDot.name}-年龄${createPersonDot.age}`;
  }
  //4.获取form-data数据
  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
      storage: multer.diskStorage({
        destination(req, file, callback) {
          //参数一：是否有错误，参数二：写入文件地址
          callback(null, 'uploads/');
        },
        filename(req, file, cb) {
          console.log(file);
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  )
  getformData(
    @Body() createPersonDot: CreatePersonDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return `上传文件成功姓名${createPersonDot.name}-年龄${createPersonDot.age}`;
  }
  //5.获取json数据
  @Post('json')
  getJson(@Body() createPersonDot: CreatePersonDto) {
    return `获取urlEncode数据成功姓名${createPersonDot.name}-年龄${createPersonDot.age}`;
  }
}
