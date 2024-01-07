import { IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  readonly userId: string;
  @IsString()
  readonly name: string;
  @IsString()
  readonly phone: string;
  @IsString()
  readonly remark: string;
  @IsString()
  readonly type: string;
  @IsString()
  readonly building: string;
  @IsString()
  readonly location: string;
  @IsString()
  readonly imageStart: string;
}
