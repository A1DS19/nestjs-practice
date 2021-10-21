import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//data: valor del parametro proporcionado al decorator
//context: inspecciona request

//para usar esto se debe de usar en conjunto con el current-user.interceptor
//ya que depende del current-user asignado ahi

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const currentUser = request.currentUser;
    return currentUser;
  },
);
