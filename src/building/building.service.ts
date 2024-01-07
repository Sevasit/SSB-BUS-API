import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Building } from './building.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BuildingService {
  constructor(
    @InjectModel('Building') private readonly buildingModel: Model<Building>,
  ) {}
  async findAll() {
    try {
      return await this.buildingModel.find().exec();
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }
}
