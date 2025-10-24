import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { error } from 'console';

@Controller('employees')
export class EmployeesController {
    constructor (private employeesService: EmployeesService) {}
    @Get('') 
    async getAllEmployees() {
        const response = await this.employeesService.fetchAllEmployees();
        return {
            total_employees: response.length,
            data: response
        }
    }

    @Post('create-user')
    async createUser(@Body() userDetails: CreateEmployeeDto) {
        const middleInitial = userDetails.middle_name.charAt(0).toUpperCase()
        const employee_name = `${userDetails.last_name}, ${userDetails.first_name} ${middleInitial}.`
        const newData = { ...userDetails, employee_name }
        const response = await this.employeesService.createEmployee(newData);
        if (!response) throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
        return {
            message: "Successfully added",
            data: response,
        }
    }

    @Get(':emp_id')
    async getEmployeeById(@Param('emp_id', ParseIntPipe) emp_id: number) {
        const response = await this.employeesService.fetchbyEmpId(emp_id)
        console.log("response", response);
        if (!response || response.length === 0) throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
        return response
    }

}
