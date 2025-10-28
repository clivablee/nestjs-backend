import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from './entities/employees';
import { LessThan, Like, MoreThan, Repository } from 'typeorm';
import { createUser, UpdateUser } from './utils/types';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees) // to give full access sa table
    private employeeRepository: Repository<Employees>, // repository handles crud operation
  ) {}

  async fetchAllEmployees() {
    return await this.employeeRepository.find({
      select: ['emp_id', 'employee_name', 'department', 'salary'],
      where: { income_type: 'Monthly' },
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
        'department',
      ],
      where: { emp_id },
    });
    console.log('data', data);
    return data;
  }

  async createEmployee(userDetails: createUser) {
    return await this.employeeRepository.save(userDetails);
  }

  async updateEmployee(emp_id: number, userDetails: UpdateUser) {
    try {
      const record = await this.employeeRepository.findOneBy({
        emp_id: emp_id,
      });
      if (!record) {
        throw new HttpException('No record found', HttpStatus.NOT_FOUND);
      }
      const sample = await this.employeeRepository.update(
        { emp_id: emp_id },
        { department: userDetails.department },
      );
      console.log('sample', sample);
      const updatedRecord = await this.employeeRepository.findOneBy({ emp_id });
      return {
        data: {
          ...updatedRecord,
        },
      };
    } catch (error) {
      // show yung record is null
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        `Failed to update employee: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
