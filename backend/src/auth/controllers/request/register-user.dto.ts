import { IsEmail, IsEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDTO {
  @IsString()
  @IsEmpty()
  name: string;

  @IsString()
  @IsEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsEmpty()
  @MinLength(8)
  password: string;
}
