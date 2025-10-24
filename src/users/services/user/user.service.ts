import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUser } from 'src/users/utils/types';

@Injectable()
export class UserService {
  private employeeRecords = [
    {
      emp_id: 1,
      emp_name: 'Vidal, Cleeve Aarejohn F.',
      department: 'Admin',
    },
    {
      emp_id: 2,
      emp_name: 'Dela Cruz, Juan M.',
      department: 'Admin',
    },
    {
      emp_id: 3,
      emp_name: 'Severo, Miguel Juan K.',
      department: 'Human Resources',
    },
  ];

  getAllUsers() {
    return [{ name: 'Cleeve', age: 21 }];
  }

  fetchUsers() {
    return {
      total_record: this.employeeRecords.length,
      data: this.employeeRecords

    }
  }

  createUser(userDetails: CreateUser) {
    this.employeeRecords.push(userDetails);
    return {}
  }

  fetchById(id: number) {
    const data = this.employeeRecords.find(i => i.emp_id === id)
    return data
  }
}
