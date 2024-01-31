import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskCountSchema } from './task-count.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'TaskCount', schema: TaskCountSchema }]),
  ],
})
export class TaskCountModule {}
