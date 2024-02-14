import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.model';
import { SendPoint } from './dto/sendPoint.dto';
import { SendTask } from './dto/sendTask.dto';
import { TaskCount } from 'src/task-count/task-count.model';
import { RejectTaskDto } from './dto/rejectTask.dto';
import { Type } from 'src/type/type.model';
import { ApproveTaskDto } from './dto/approve.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
    @InjectModel('TaskCount') private readonly TaskCount: Model<TaskCount>,
    @InjectModel('Type') private readonly typeModel: Model<Type>,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    try {
      const newTask = new this.taskModel({
        userId: createTaskDto.userId,
        name: createTaskDto.name,
        phone: createTaskDto.phone,
        remark: createTaskDto.remark,
        type: createTaskDto.type,
        building: createTaskDto.building,
        location: createTaskDto.location,
        imageStart: createTaskDto.imageStart,
      });
      //Update TaskCount count += 1
      await this.TaskCount.updateOne(
        { typeId: createTaskDto.type },
        { $inc: { count: 1 } },
      ).exec();

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

  async findAllTaskHistory() {
    try {
      return this.taskModel
        .find()
        .populate({
          path: 'type',
          select: 'typeName -_id', // Select the specific fields from the 'type' collection
        })
        .populate({
          path: 'building',
          select: 'nameBuilding -_id', // Select the specific fields from the 'building' collection
        })
        .select(
          '_id name userId phone type building status createdAt updatedAt',
        )
        .exec();
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

  async findById(id: string) {
    try {
      return this.taskModel
        .findOne({
          _id: id,
        })
        .populate({
          path: 'type',
          select: 'typeName -_id', // Select the specific fields from the 'type' collection
        })
        .populate({
          path: 'building',
          select: 'nameBuilding -_id', // Select the specific fields from the 'building' collection
        })
        .select(
          '_id name phone remark type building location status imageStart createdAt',
        )
        .exec();
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async findAllByIdUser(userId: string) {
    try {
      return await this.taskModel
        .find({
          userId: userId,
        })
        .populate({
          path: 'type',
          select: 'typeName -_id', // Select the specific fields from the 'type' collection
        })
        .populate({
          path: 'building',
          select: 'nameBuilding -_id', // Select the specific fields from the 'building' collection
        })
        .select(
          '_id phone remark type building location status imageStart createdAt',
        )
        .exec();
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async findCompleteByIdUser(userId: string) {
    try {
      return await this.taskModel
        .find({
          userId: userId,
          status: 'complete',
        })
        .populate({
          path: 'type',
          select: 'typeName -_id', // Select the specific fields from the 'type' collection
        })
        .populate({
          path: 'building',
          select: 'nameBuilding -_id', // Select the specific fields from the 'building' collection
        })
        .select(
          '_id imageEnd type building location status createdAt processAt point',
        )
        .exec();
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async findPendingByAdmin() {
    try {
      return this.taskModel
        .find({
          status: 'pending',
        })
        .populate({
          path: 'type',
          select: 'typeName -_id', // Select the specific fields from the 'type' collection
        })
        .populate({
          path: 'building',
          select: 'nameBuilding -_id', // Select the specific fields from the 'building' collection
        })
        .select('_id name phone type building createdAt')
        .exec();
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async findPendingByType(type: string) {
    try {
      return this.taskModel
        .find({
          type: type,
          status: 'pending',
        })
        .populate({
          path: 'type',
          select: 'typeName -_id', // Select the specific fields from the 'type' collection
        })
        .populate({
          path: 'building',
          select: 'nameBuilding -_id', // Select the specific fields from the 'building' collection
        })
        .select('_id name phone type building createdAt')
        .exec()
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return [];
        });
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async findCompleteByType(type: string) {
    try {
      return this.taskModel
        .find({
          type: type,
          status: 'approve',
        })
        .populate({
          path: 'type',
          select: 'typeName -_id', // Select the specific fields from the 'type' collection
        })
        .populate({
          path: 'building',
          select: 'nameBuilding -_id', // Select the specific fields from the 'building' collection
        })
        .select('_id name phone type building createdAt')
        .exec()
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return [];
        });
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async findCurrentTaskByType(type: string) {
    try {
      const currentDate = new Date();
      const startOfDay = new Date(currentDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(currentDate);
      endOfDay.setHours(23, 59, 59, 999);

      let query = {};

      if (type === '65c862c1744dfbb04f087387') {
        query = {
          createdAt: {
            $gte: startOfDay.toISOString(),
            $lte: endOfDay.toISOString(),
          },
        };
      } else {
        query = {
          createdAt: {
            $gte: startOfDay.toISOString(),
            $lte: endOfDay.toISOString(),
          },
          type: type,
        };
      }

      const result = await this.taskModel
        .find(query)
        .select('_id name phone createdAt')
        .exec()
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return [];
        });
      return result;
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async findTaskCount() {
    try {
      const data = await this.TaskCount.find()
        .select('type count')
        .sort('type')
        .exec();
      let listMap = new Map<any, any>();
      let listLabel = new Array<string>();
      let listCount = new Array<number>();
      data.forEach((element) => {
        listLabel.push(element.type);
        listCount.push(element.count);
      });
      listMap['label'] = listLabel;
      listMap['count'] = listCount;
      return listMap;
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async findTaskCountToGraph() {
    try {
      return await this.TaskCount.find()
        .select('type count')
        .sort('type')
        .exec();
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async sendTaskReject(rejectTaskDto: RejectTaskDto) {
    try {
      const task = await this.taskModel.findById(rejectTaskDto.id);
      task.annotation = rejectTaskDto.annotation;
      task.status = 'reject';
      task.processBy = rejectTaskDto.processBy;
      task.processAt = new Date();
      await task.save();
      return {
        message: 'Reject task successfully',
        type: true,
      };
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async sendTaskApprove(approveTaskDto: ApproveTaskDto) {
    try {
      const task = await this.taskModel.findById(approveTaskDto.id);
      task.status = 'approve';
      task.processBy = approveTaskDto.processBy;
      task.processAt = new Date();
      await task.save();
      return {
        message: 'Approve task successfully',
        type: true,
      };
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async sendTask(sendTask: SendTask) {
    try {
      const task = await this.taskModel.findById(sendTask.id);
      task.status = 'complete';
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
        message: 'Send point to task successfully',
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
