import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports/entity/report.entity';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/entity/user.entity';
import { UsersModule } from './users/users.module';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    //hacer el modulo para acceso global
    //direccion de archivos .env es basadoe en el ambiente actual
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(),
    ReportsModule,
    UsersModule,
  ],
  //Aplicar el ValidationPipe a cada request en la aplicacion
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}
  //Aplicar middleware a toda la aplicacion y todas las rutas con el *
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get<string>('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
