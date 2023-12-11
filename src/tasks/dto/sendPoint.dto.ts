import { IsNumber, IsString } from 'class-validator';

export class SendPoint {
  @IsString()
  readonly id: string;
  @IsNumber()
  readonly point: number;
}
