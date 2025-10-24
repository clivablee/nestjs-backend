import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from './entities/employees';
import { LessThan, Like, MoreThan, Repository } from 'typeorm';
import { createUser } from './utils/types';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees) // to give full access sa table
    private employeeRepository: Repository<Employees>, // repository handles crud operation
  ) {}

  async fetchAllEmployees() {
    return await this.employeeRepository.find({
      select: ['emp_id', 'employee_name', 'department', 'salary'],
      where: { employee_name: Like('%Dela Cruz%') },
    });
  }

  async fetchbyEmpId(emp_id: number) {
    const data = await this.employeeRepository.find({
      select: [
        'emp_id',
        'employee_name',
        'first_name',
        'middle_name',
        'last_name',
      ],
      where: { emp_id },
    });
    console.log('data', data);
    return data
  }

  async createEmployee(userDetails: createUser) {
    return await this.employeeRepository.save(userDetails);
  }
}
