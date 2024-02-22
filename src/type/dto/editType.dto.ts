import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class EditTypeDto {
  @IsString()
  readonly id: string;
  @IsString()
  readonly typeName: string;
  @IsString()
  readonly typeCode: string;
  @IsBoolean()
  readonly status: boolean;
}
