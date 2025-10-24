import { Module } from '@nestjs/common';
import { RecordsController } from './app.controller';
import { RecordsService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesController } from './employees/employees.controller';
import { EmployeesModule } from './employees/employees.module';
import { Employees } from './employees/entities/employees';
import { configDotenv } from 'dotenv';

configDotenv();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [Employees],
      synchronize: true,
    }),
    UsersModule,
    EmployeesModule
  ],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class AppModule {}
