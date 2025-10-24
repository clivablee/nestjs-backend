import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employees } from './entities/employees';

@Module({
  imports: [TypeOrmModule.forFeature([Employees])], //to use employees table 
  controllers: [EmployeesController],
  providers: [EmployeesService]
})
export class EmployeesModule {}
