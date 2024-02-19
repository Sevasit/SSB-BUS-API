import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './task.model';
import { TaskCountSchema } from 'src/task-count/task-count.model';
import { TypeSchema } from 'src/type/type.model';
import { BuildingSchema } from 'src/building/building.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'Task', schema: TaskSchema },
      { name: 'TaskCount', schema: TaskCountSchema },
      { name: 'Type', schema: TypeSchema },
      { name: 'Building', schema: BuildingSchema },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
