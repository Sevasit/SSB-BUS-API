import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  readonly firstName: string;
  @IsString()
  readonly lastName: string;
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly password: string;
}
