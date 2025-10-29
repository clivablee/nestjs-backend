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
}
