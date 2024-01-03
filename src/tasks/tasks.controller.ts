import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { SendTask } from './dto/sendTask.dto';
import { SendPoint } from './dto/sendPoint.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  @HttpCode(201)
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.create(createTaskDto);
  }

  @Get('findAllTask')
  @HttpCode(200)
  async findAll() {
    return await this.tasksService.findAllTasks();
  }

  @Get('findByType')
  @HttpCode(200)
  async findByType(@Query('type') type: string) {
    return await this.tasksService.findByType(type);
  }

  @Patch('sendTaskApprove')
  @HttpCode(201)
  async sendTaskApprove(@Query('id') id: string) {
    return await this.tasksService.sendTaskApprove(id);
  }

  @Patch('sendTask')
  @HttpCode(201)
  async sendTask(@Body() sendTask: SendTask) {
    return await this.tasksService.sendTask(sendTask);
  }

  @Patch('sendpoint')
  @HttpCode(201)
  async sendPoint(@Body() sendPoint: SendPoint) {
    return await this.tasksService.sendPoint(sendPoint);
  }

  @Delete('delete')
  @HttpCode(201)
  async delete(@Query('id') id: string) {
    return await this.tasksService.delete(id);
  }
}
