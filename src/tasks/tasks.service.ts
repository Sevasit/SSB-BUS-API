import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.model';
import { SendPoint } from './dto/sendPoint.dto';
import { SendTask } from './dto/sendTask.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}
  async create(createTaskDto: CreateTaskDto) {
    try {
      const newTask = new this.taskModel({
        name: createTaskDto.name,
        phone: createTaskDto.phone,
        title: createTaskDto.title,
        remark: createTaskDto.remark,
        type: createTaskDto.type,
        imageStart: createTaskDto.imageStart,
      });
      await newTask.save();
      return {
        message: 'Created task successfully',
        type: true,
      };
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async findAllTasks() {
    try {
      return this.taskModel.find().exec();
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async findByType(type: string) {
    try {
      return this.taskModel
        .find({
          type: type,
        })
        .exec();
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async sendTask(sendTask: SendTask) {
    try {
      const task = await this.taskModel.findById(sendTask.id);
      task.status = sendTask.status;
      task.imageEnd = sendTask.imageEnd;
      task.processBy = sendTask.processBy;
      task.processAt = new Date();
      await task.save();
      return {
        message: 'Updated task successfully',
        type: true,
      };
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async sendPoint(sendPoint: SendPoint) {
    try {
      const task = await this.taskModel.findOne({ _id: sendPoint.id });
      if (task === null)
        return {
          message: 'Task not found',
          type: false,
        };
      task.point = sendPoint.point;
      await task.save();
      return {
        message: 'Updated task successfully',
        type: true,
      };
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async delete(id: string) {
    try {
      await this.taskModel.deleteOne({ _id: id }).exec();
      return {
        message: 'Deleted task successfully',
        type: true,
      };
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }
}
