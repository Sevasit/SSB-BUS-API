import { IsDate, IsString } from 'class-validator';

export class ApproveTaskDto {
  @IsString()
  readonly id: string;
  @IsString()
  readonly processBy: string;
}
