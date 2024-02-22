import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateTypeDto {
  @IsString()
  readonly typeName: string;
  @IsString()
  readonly typeCode: string;
  @IsBoolean()
  readonly status: boolean;
}
