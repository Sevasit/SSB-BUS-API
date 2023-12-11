import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpCode,
} from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/createType.dto';
import { AuthGuard } from 'src/User/user.guard';
import { EditTypeDto } from './dto/editType.dto';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post('create')
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async create(@Body() createTypeDto: CreateTypeDto) {
    return await this.typeService.createType(createTypeDto);
  }

  @Get('findAllType')
  @HttpCode(200)
  async findAllType() {
    return await this.typeService.findAllType();
  }

  @Patch('edit')
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async update(@Body() createTypeDto: EditTypeDto) {
    return await this.typeService.updateType(createTypeDto);
  }

  @Delete('delete')
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async remove(@Query('id') id: string) {
    return await this.typeService.removeType(id);
  }
}
