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

      const hasUpdateName =
        userDetails.first_name?.trim() ||
        userDetails.middle_name?.trim() ||
        userDetails.last_name?.trim();

      if (hasUpdateName) {
        const first_name = userDetails.first_name
          ? userDetails.first_name
          : record.first_name;
        const middle_name = userDetails.middle_name
          ? userDetails.middle_name
          : record.middle_name;
        const last_name = userDetails.last_name
          ? userDetails.last_name
          : record.last_name;
        
        const middleInitial = middle_name.trim() ? `${middle_name.charAt(0).toUpperCase()}.`: '';
        //(e.g. Dela Cruz, Juan M.)
        const employee_name = `${last_name}, ${first_name} ${middleInitial}`

        userDetails.employee_name = employee_name;
      }

      const sample = await this.employeeRepository.update(
        { emp_id: emp_id },
        userDetails,
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

  async deleteEmployee(emp_id: number) {
    try {
      const record = await this.employeeRepository.findOneBy({ emp_id: emp_id })
      if(!record){
        throw new HttpException('No record found', HttpStatus.NOT_FOUND);
      }
      const data = await this.employeeRepository.delete({ emp_id: emp_id });
      return {
        data
      };
      
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Failed to delete employee: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    
  }
}
