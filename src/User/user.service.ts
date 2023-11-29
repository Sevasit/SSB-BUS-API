import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { UserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { EditUserDto } from './dto/editUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly model: Model<User>,
    private jwtService: JwtService,
  ) {}

  async addUser(user: UserDto) {
    try {
      const userFind = await this.model.findOne({ email: user.email });
      if (userFind != null) {
        return 'Email already exists';
      }
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = new this.model({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword,
      });
      await newUser.save();
      return 'Created user successfully';
    } catch (err) {
      throw new BadRequestException('Invalid form');
    }
  }

  async editUser(user: EditUserDto) {
    try {
      const userFind = await this.model.findOne({ _id: user.id });
      if (userFind == null) {
        return 'User not found';
      }
      const isPasswordMatched = await bcrypt.compare(
        user.password,
        userFind.password,
      );

      if (!isPasswordMatched) {
        return 'Invalid password';
      }

      const hashedPassword = await bcrypt.hash(user.newPassword, 10);
      await this.model.updateOne(
        { _id: user.id },
        {
          $set: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: hashedPassword,
            updateDate: new Date(),
          },
        },
      );
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Invalid form');
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.model.findOne({ email: loginDto.email });
    if (!user) {
      return 'Invalid email or password';
    }

    const isPasswordMatched = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordMatched) {
      return 'Invalid password';
    }

    const token = this.jwtService.sign({
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    return {
      token: token,
      data: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }
}
