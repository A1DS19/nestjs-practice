import { IsString } from 'class-validator';

export class SigninUserDto {
  @IsString({ message: 'Datos invalidos' })
  email: string;

  @IsString({ message: 'Datos invalidos' })
  password: string;
}
