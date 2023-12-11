import { IsDate, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  readonly id: string;
  @IsString()
  readonly processBy: string;
  @IsString()
  readonly imageEnd: string;
  @IsString()
  readonly status: string;
}
