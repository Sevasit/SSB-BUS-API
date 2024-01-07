import { Module } from '@nestjs/common';
import { BuildingService } from './building.service';
import { BuildingController } from './building.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildingSchema } from './building.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'Building', schema: BuildingSchema }]),
  ],
  controllers: [BuildingController],
  providers: [BuildingService],
})
export class BuildingModule {}
