import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async addUser(@Body() user: UserDto) {
    try {
      const generatedId = await this.userService.addUser(user);
      return { id: generatedId };
    } catch (err) {
      console.log(err);
    }
  }
}
