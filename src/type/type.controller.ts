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
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typeService.createType(createTypeDto);
  }

  @Get('findAllType')
  @HttpCode(200)
  findAllType() {
    return this.typeService.findAllType();
  }

  @Patch('edit')
  @UseGuards(AuthGuard)
  update(@Body() createTypeDto: EditTypeDto) {
    return this.typeService.updateType(createTypeDto);
  }

  @Delete('delete')
  @HttpCode(201)
  @UseGuards(AuthGuard)
  remove(@Query('id') id: string) {
    return this.typeService.removeType(id);
  }
}
