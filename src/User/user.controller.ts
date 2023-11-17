import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService) {}
    @Post()
    async addUser(
        @Body('firstName') firstName: string,
        @Body('lastName') lastName: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        const generatedId = await this.userService.addUser(
            firstName,
            lastName,
            email,
            password,
        );
        return { id: generatedId };
    }
}