import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsEmail({}, { message: 'El email debe tener el formato correcto' })
  @IsOptional()
  email: string;

  @IsString({ message: 'Deben ser letras' })
  @Length(6, 100, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsOptional()
  password: string;
}
