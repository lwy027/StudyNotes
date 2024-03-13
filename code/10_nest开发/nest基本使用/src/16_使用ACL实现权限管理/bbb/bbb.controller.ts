import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { BbbService } from './bbb.service';
import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';
import { LoginGuard } from '../login.guard';
import { PermissionGuard } from '../permission.guard';

@Controller('bbb')
export class BbbController {
  constructor(private readonly bbbService: BbbService) {}

  @Post()
  @UseGuards(LoginGuard, PermissionGuard)
  create(@Body() createBbbDto: CreateBbbDto) {
    return this.bbbService.create(createBbbDto);
  }
  @SetMetadata('permission', 'query_bbb')
  @Get()
  @UseGuards(LoginGuard, PermissionGuard)
  findAll() {
    return this.bbbService.findAll();
  }

  @Get(':id')
  @UseGuards(LoginGuard, PermissionGuard)
  findOne(@Param('id') id: string) {
    return this.bbbService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(LoginGuard, PermissionGuard)
  update(@Param('id') id: string, @Body() updateBbbDto: UpdateBbbDto) {
    return this.bbbService.update(+id, updateBbbDto);
  }

  @Delete(':id')
  @UseGuards(LoginGuard, PermissionGuard)
  remove(@Param('id') id: string) {
    return this.bbbService.remove(+id);
  }
}
