import { IsEmail, IsString } from 'class-validator';

export class EditUserDto {
  @IsString()
  readonly id: string;
  @IsString()
  readonly firstName: string;
  @IsString()
  readonly lastName: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly phone: string;
  @IsString()
  readonly oldPassword: string;
  @IsString()
  readonly newPassword: string;
  @IsString()
  readonly role: string;
}
