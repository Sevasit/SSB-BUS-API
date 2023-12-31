import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTypeDto } from './dto/createType.dto';
import { Model } from 'mongoose';
import { Type } from './type.model';
import { InjectModel } from '@nestjs/mongoose';
import { EditTypeDto } from './dto/editType.dto';

@Injectable()
export class TypeService {
  constructor(@InjectModel('Type') private readonly typeModel: Model<Type>) {}

  async createType(createTypeDto: CreateTypeDto) {
    try {
      const findTypeByName = await this.typeModel.findOne({
        typeName: createTypeDto.typeName,
      });
      const findTypeByCode = await this.typeModel.findOne({
        typeCode: createTypeDto.typeCode,
      });
      if (findTypeByName != null) {
        return {
          message: 'Type already exists',
          type: true,
        };
      }
      if (findTypeByCode != null) {
        return {
          message: 'Type code already exists',
          type: true,
        };
      }
      const newType = new this.typeModel({
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
      return await this.typeModel
        .find()
        .select('_id typeName typeCode createdAt')
        .exec();
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
      const findTypeByName = await this.typeModel.findOne({
        typeName: editTypeDto.typeName,
      });
      const findTypeByCode = await this.typeModel.findOne({
        typeCode: editTypeDto.typeCode,
      });
      if (findTypeByName != null || findTypeByCode != null) {
        return {
          message: 'Type already exists',
          type: true,
        };
      }
      await this.typeModel.updateOne(
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
      const findType = await this.typeModel.findOne({ _id: id });
      if (findType == null) {
        return {
          message: 'Cannot find type',
          type: true,
        };
      }
      await this.typeModel.deleteOne({ _id: id }).exec();
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
