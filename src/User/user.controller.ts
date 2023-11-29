import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { EditUserDto } from './dto/editUser.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async addUser(@Body() user: UserDto) {
    return await this.userService.addUser(user);
  }

  @Post('editUser')
  async editUser(@Body() user: EditUserDto) {
    return await this.userService.editUser(user);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }
}
