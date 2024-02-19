import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeSchema } from './type.model';
import { ConfigModule } from '@nestjs/config';
import { TaskCountSchema } from 'src/task-count/task-count.model';
import { TaskSchema } from 'src/tasks/task.model';
import { UserSchema } from 'src/User/user.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'Task', schema: TaskSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Type', schema: TypeSchema },
      { name: 'TaskCount', schema: TaskCountSchema },
    ]),
  ],
  controllers: [TypeController],
  providers: [TypeService],
})
export class TypeModule {}
