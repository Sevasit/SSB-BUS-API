import { IsDate, IsString } from 'class-validator';

export class SendTask {
  @IsString()
  readonly id: string;
  @IsString()
  readonly processBy: string;
  @IsString()
  readonly imageEnd: string;
  @IsString()
  readonly status: string;
}
