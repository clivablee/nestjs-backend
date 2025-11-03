import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from 'src/employees/entities/employees';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';
import { find, first } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Employees)
    private employeeRepository: Repository<Employees>, //get employees db
  ) {}

  async validateUser(body: LoginAuthDto) {
    try {
      console.log('[2] DATABASE: ', body);
      const findUser = await this.employeeRepository.findOneBy({
        email_work: body.username,
      });
      if (!findUser || findUser.password !== body.password) {
        throw new HttpException(
          'No record found. Please check your credentials.',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        employee_name: findUser.employee_name,
        emp_id: findUser.emp_id,
        email_work: findUser.email_work,
        job_title: findUser.job_title,
        first_name: findUser.first_name,
        access_rights: findUser.access_rights
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          `Error occurred: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async login(user: any) {
    console.log('[4] SIGNIN TOKEN: ', user);
    const payload = {
      emp_id: user.emp_id,
      email_work: user.email_work,
    };
    const token = this.jwtService.sign(payload);
    return {
      data: {
        employee_name: user.employee_name,
        first_name: user.first_name,
        emp_id: payload.emp_id,
        job_title: user.job_title,
        access_rights: user.access_rights,
        token: token,
      },
    };
  }
}
