import { IsEmail, IsString } from 'class-validator';

export class EditUserDto {
  @IsString()
  readonly id: string;
  @IsString()
  readonly firstName: string;
  @IsString()
  readonly lastName: string;
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly newPassword: string;
  @IsString()
  readonly role: string;
}
