import { IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly phone: string;
  @IsString()
  readonly title: string;
  @IsString()
  readonly remark: string;
  @IsString()
  readonly type: string;
  @IsString()
  readonly imageStart: string;
}
