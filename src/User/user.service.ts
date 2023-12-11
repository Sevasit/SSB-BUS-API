import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
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
      const userFindRole = await this.model.findOne({ role: user.role });

      if(userFindRole != null) {
        return {
          message: 'Role already exists',
          type: true,
        };
      }

      if (userFind != null) {
        return {
          message: 'Email already exists',
          type: true,
        };
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);

      const newUser = new this.model({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword,
        role: user.role
      });

      await newUser.save();

      return {
        message: 'Created user successfully',
        type: true,
      };
    } catch (err) {
      throw new InternalServerErrorException({
        message: 'Error',
        type: false,
      });
    }
  }

  async editUser(user: EditUserDto) {
    try {
      const userFind = await this.model.findOne({ _id: user.id });
      const userFindRole = await this.model.findOne({ role: user.role });

      if(userFindRole != null) {
        return {
          message: 'Role already exists',
          type: true,
        };
      }

      if (userFind == null) {
        return {
          message: 'User not found',
          type: true,
        };
      }

      const isPasswordMatched = await bcrypt.compare(
        user.password,
        userFind.password,
      );

      if (!isPasswordMatched) {
        return {
          message: 'Invalid password',
          type: true,
        };
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
            role: user.role
          },
        },
      );

      return {
        message: 'Updated user successfully',
        type: true,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException({
        message: 'Error',
        type: false,
      });
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.model.findOne({ email: loginDto.email });

      if (!user) {
        return {
          message: 'Invalid email or password',
          type: false,
        };
      }

      const isPasswordMatched = await bcrypt.compare(
        loginDto.password,
        user.password,
      );

      if (!isPasswordMatched) {
        return {
          message: 'Invalid password',
          type: false,
        };
      }

      const token = this.jwtService.sign({
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      });

      return {
        token: token,
        data: {
          id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        },
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException({
        message: 'Error',
        type: false,
      });
    }
  }
}
