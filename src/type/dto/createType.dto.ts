import { IsEmail, IsString } from 'class-validator';

export class CreateTypeDto {
  @IsString()
  readonly typeName: string;
  @IsString()
  readonly typeCode: string;
}
