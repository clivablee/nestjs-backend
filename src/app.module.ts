import { Module } from '@nestjs/common';
import { RecordsController } from './app.controller';
import { RecordsService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesController } from './employees/employees.controller';
import { EmployeesModule } from './employees/employees.module';
import { Employees } from './employees/entities/employees';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    //for env to be accessible everywhere
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    EmployeesModule,
    AuthModule,
  ],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class AppModule {}
