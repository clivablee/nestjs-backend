import { IsNotEmpty, isNumber, IsNumber } from 'class-validator';

export class CreateEmployeeDto {
  @IsNumber()
    emp_id: number;
    
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  middle_name: string;

  @IsNotEmpty()
  last_name: string;
}
