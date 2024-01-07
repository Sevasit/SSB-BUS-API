import { Controller, Get } from '@nestjs/common';
import { BuildingService } from './building.service';

@Controller('building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Get()
  async findAll() {
    return await this.buildingService.findAll();
  }
}
