import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { EditUserDto } from './dto/editUser.dto';
import { AuthGuard } from './user.guard';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async addUser(@Body() user: UserDto) {
    return await this.userService.addUser(user);
  }

  @Patch('editUser')
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async editUser(@Body() user: EditUserDto) {
    return await this.userService.editUser(user);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }

  @Get('findUserData')
  @HttpCode(200)
  async findUserData(@Query('email') email: string) {
    return await this.userService.findUserData(email);
  }

  @Get('findUserDataById')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async findUserDataById(@Query('id') id: string) {
    return await this.userService.findUserDataById(id);
  }

  @Get('findUsers')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async findUsers() {
    return await this.userService.findUsers();
  }

  @Delete('delete')
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async delete(@Query('id') id: string) {
    return await this.userService.delete(id);
  }
}
