import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsNumber()
  emp_id: number;

  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  first_name: string;

  @IsOptional()
  middle_name: string;

  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  department: string;

  @IsNotEmpty()
  @IsString()
  income_type: string

  @IsNotEmpty()
  @IsNumber()
  salary: number

  @IsOptional()
  date_of_birth: string
}
