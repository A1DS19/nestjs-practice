import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'El email debe tener el formato correcto' })
  email: string;

  @IsString({ message: 'Deben ser letras' })
  @Length(6, 100, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}
