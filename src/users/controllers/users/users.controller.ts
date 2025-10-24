import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UserService } from 'src/users/services/user/user.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get('')
  getUsers() {
    return this.userService.fetchUsers();
  }

  @Post('save')
  addUser(@Body() userData: CreateUserDto) {
    const isExisting = this.userService.fetchById(userData.emp_id);
    if (isExisting) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    //add data
    this.userService.createUser(userData);
    return {
      message: "Successfully added",
      data: userData
    }
  }

  @Get(':emp_id')
  getByEmpID(@Param('emp_id', ParseIntPipe) emp_id: number) {
    const response = this.userService.fetchById(emp_id);
    if (!response) throw new BadRequestException();
    return response;
  }

  
}
