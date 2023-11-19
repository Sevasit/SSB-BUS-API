import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './User/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://new12253952:0991588559New@cluster0.3zyfd80.mongodb.net/Report-Master?retryWrites=true&w=majority',
    ),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
