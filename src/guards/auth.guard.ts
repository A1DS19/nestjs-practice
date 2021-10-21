import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    //Si existe el userId(truthy) va a dejar pasar, pero si no esta el
    //userId(falsey) no va a dejar pasar

    return request.session.userId;
  }
}
