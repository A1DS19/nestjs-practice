import {
  IsNumber,
  IsString,
  Max,
  Min,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @Min(0)
  @Max(100000000)
  price: number;

  @IsString({ message: 'La marca del vehiculo es requerida' })
  make: string;

  @IsString({ message: 'El modelo del vehiculo es requerido' })
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(new Date().getFullYear() + 2)
  year: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}
