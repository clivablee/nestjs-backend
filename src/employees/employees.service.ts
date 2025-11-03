import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from './entities/employees';
import { LessThan, Like, MoreThan, Repository } from 'typeorm';
import { createUser, UpdateUser } from './utils/types';
import { getEmployeeRates, getFullName } from './utils/general.util';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees) // to give full access sa table
    private employeeRepository: Repository<Employees>, // repository handles crud operation
  ) {}

  async fetchAllEmployees() {
    return await this.employeeRepository.find({
      select: ['emp_id', 'employee_name', 'department', 'salary'],
      // where: { income_type: 'Monthly' },
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

  async createEmployee(userDetails: CreateEmployeeDto) {
    const employee_name = getFullName(
      userDetails.first_name,
      userDetails.last_name,
      userDetails.middle_name,
    );
    const rates = getEmployeeRates(userDetails.income_type, userDetails.salary);
    const newData = {
      ...userDetails,
      employee_name,
      basic_salary: rates.basic_salary,
      daily_rate: rates.daily_rate,
      hourly_rate: rates.hourly_rate,
      minute_rate: rates.minute_rate,
    };
    const isExist = await this.employeeRepository.findOneBy({
      emp_id: userDetails.emp_id,
    });
    if (isExist) {
      throw new HttpException(
        'Employee id already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.employeeRepository.save(newData);
  }

  async updateEmployee(emp_id: number, userDetails: UpdateEmployeeDto) {
    try {
      const hasRecord = await this.employeeRepository.findOneBy({
        emp_id: emp_id,
      });
      if (!hasRecord) {
        throw new HttpException('No record found', HttpStatus.NOT_FOUND);
      }

      const first_name = userDetails.first_name ?? hasRecord.first_name;
      const middle_name = userDetails.middle_name ?? hasRecord.middle_name;
      const last_name = userDetails.last_name ?? hasRecord.last_name;
      const income_type = userDetails.income_type ?? hasRecord.income_type;
      const salary = userDetails.salary ?? hasRecord.salary;
      const rates = getEmployeeRates(income_type, salary);
      const employee_name = getFullName(first_name, last_name, middle_name);

      const newData = {
        ...userDetails,
        employee_name,
        basic_salary: rates.basic_salary,
        daily_rate: rates.daily_rate,
        hourly_rate: rates.hourly_rate,
        minute_rate: rates.minute_rate,
      };


      //perform db update
      await this.employeeRepository.update({ emp_id: emp_id }, newData);

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
      const record = await this.employeeRepository.findOneBy({
        emp_id: emp_id,
      });
      if (!record) {
        throw new HttpException('No record found', HttpStatus.NOT_FOUND);
      }
      const data = await this.employeeRepository.delete({ emp_id: emp_id });
      return {
        data,
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
