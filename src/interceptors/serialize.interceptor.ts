import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface ClassContructor {
  new (...args: any[]): any;
}

export function Serialize(Dto: ClassContructor) {
  return UseInterceptors(new SerializeInterceptor(Dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private Dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run before request is handled

    return handler.handle().pipe(
      map((data: any) => {
        //Run before request is sent
        //retorna SOLO los datos dentro de UserDto(excluye password porque no esta en dto)
        return plainToClass(this.Dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
