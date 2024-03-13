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
import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { LoginGuard } from '../login.guard';
import { PermissionGuard } from '../permission.guard';

@Controller('aaa')
export class AaaController {
  constructor(private readonly aaaService: AaaService) {}

  @Post()
  @UseGuards(LoginGuard, PermissionGuard)
  create(@Body() createAaaDto: CreateAaaDto) {
    return this.aaaService.create(createAaaDto);
  }

  @SetMetadata('permission', 'query_bbb')
  @Get()
  @UseGuards(LoginGuard, PermissionGuard)
  findAll() {
    return this.aaaService.findAll();
  }

  @Get(':id')
  @UseGuards(LoginGuard, PermissionGuard)
  findOne(@Param('id') id: string) {
    return this.aaaService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(LoginGuard, PermissionGuard)
  update(@Param('id') id: string, @Body() updateAaaDto: UpdateAaaDto) {
    return this.aaaService.update(+id, updateAaaDto);
  }

  @Delete(':id')
  @UseGuards(LoginGuard, PermissionGuard)
  remove(@Param('id') id: string) {
    return this.aaaService.remove(+id);
  }
}
