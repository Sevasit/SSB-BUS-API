import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeSchema } from './type.model';
import { ConfigModule } from '@nestjs/config';
import { TaskCountSchema } from 'src/task-count/task-count.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'Type', schema: TypeSchema },
      { name: 'TaskCount', schema: TaskCountSchema },
    ]),
  ],
  controllers: [TypeController],
  providers: [TypeService],
})
export class TypeModule {}
