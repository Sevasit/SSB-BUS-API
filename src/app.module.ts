import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './User/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './User/user.guard';
import { ConfigModule } from '@nestjs/config';
import { TypeModule } from './type/type.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.USERNAME_MONGO}:${process.env.PASSWORD_MONGO}@cluster0.3zyfd80.mongodb.net/Report-Master?retryWrites=true&w=majority`,
    ),
    UserModule,
    TypeModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// Authentification before any request
/*
providers: [AppService
  ,{
  provide: APP_GUARD,
  useClass: AuthGuard,
},],
*/
