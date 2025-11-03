import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { RESPONSE_PASSTHROUGH_METADATA } from '@nestjs/common/constants';

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

    @Get(':emp_id')
    async getEmployeeById(@Param('emp_id', ParseIntPipe) emp_id: number) {
        const response = await this.employeesService.fetchbyEmpId(emp_id)
        console.log("response", response);
        if (!response || response.length === 0) throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
        return response
    }
    
    @Post('create-user')
    async createUser(@Body() userDetails: CreateEmployeeDto) {
        const response = await this.employeesService.createEmployee(userDetails)
        return response
    }

    @Put(':emp_id')
    async updateEmployeeById(
        @Param('emp_id', ParseIntPipe) emp_id: number,
        @Body() updateData: UpdateEmployeeDto
    ) {
        const response = await this.employeesService.updateEmployee(emp_id, updateData)
        return response
    }

    @Delete(':emp_id')
    async deleteEmployee(
        @Param('emp_id', ParseIntPipe) emp_id: number,
    ) {
        const response = await this.employeesService.deleteEmployee(emp_id)
        if (response.data.affected !== 0) return { message: "Deleted successfully" }
    }
}
