import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports/entity/report.entity';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/entity/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true,
      logging: true,
    }),
    ReportsModule,
    UsersModule,
  ],
})
export class AppModule {}
