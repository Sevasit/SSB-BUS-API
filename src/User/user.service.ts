import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.model";

@Injectable()
export class UserService {
    
    constructor(@InjectModel('User') private readonly model: Model<User>,) {}

  async addUser(firstName: string, lastName: string, email: string, password: string) {
    const newUser = new this.model({
      firstName,
      lastName,
      email,
      password,
    });
    const result = await newUser.save();
    return result.id as string;
  }
}