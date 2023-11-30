import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTypeDto } from './dto/createType.dto';
import { Model } from 'mongoose';
import { Type } from './type.model';
import { InjectModel } from '@nestjs/mongoose';
import { EditTypeDto } from './dto/editType.dto';

@Injectable()
export class TypeService {
  constructor(@InjectModel('Type') private readonly model: Model<Type>) {}

  async createType(createTypeDto: CreateTypeDto) {
    try {
      const findTypeByName = await this.model.findOne({
        typeName: createTypeDto.typeName,
      });
      const findTypeByCode = await this.model.findOne({
        typeCode: createTypeDto.typeCode,
      });
      if (findTypeByName != null || findTypeByCode != null) {
        return {
          message: 'Type already exists',
          type: true,
        };
      }
      const newType = new this.model({
        typeName: createTypeDto.typeName,
        typeCode: createTypeDto.typeCode,
      });
      await newType.save();
      return {
        message: 'Created type successfully',
        type: true,
      };
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({
        message: 'Error',
        type: false,
      });
    }
  }

  async findAllType() {
    try {
      return await this.model.find().select('_id typeName typeCode').exec();
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({
        message: 'Error',
        type: false,
      });
    }
  }

  async updateType(editTypeDto: EditTypeDto) {
    try {
      const findTypeByName = await this.model.findOne({
        typeName: editTypeDto.typeName,
      });
      const findTypeByCode = await this.model.findOne({
        typeCode: editTypeDto.typeCode,
      });
      if (findTypeByName != null || findTypeByCode != null) {
        return {
          message: 'Type already exists',
          type: true,
        };
      }
      await this.model.updateOne(
        { _id: editTypeDto.id },
        {
          $set: {
            typeName: editTypeDto.typeName,
            typeCode: editTypeDto.typeCode,
          },
        },
      );
      return {
        message: 'Updated type successfully',
        type: true,
      };
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({
        message: 'Error',
        type: false,
      });
    }
  }

  async removeType(id: string) {
    try {
      const findType = await this.model.findOne({ _id: id });
      if (findType == null) {
        return {
          message: 'Cannot find type',
          type: true,
        };
      }
      await this.model.deleteOne({ _id: id }).exec();
      return {
        message: 'Deleted type successfully',
        type: true,
      };
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({
        message: 'Error',
        type: false,
      });
    }
  }
}
