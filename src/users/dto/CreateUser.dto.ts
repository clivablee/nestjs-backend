import { isNotEmpty, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  emp_id: number;

  @IsNotEmpty()
  emp_name: string;
  
  @IsNotEmpty()
  department: string;
}
