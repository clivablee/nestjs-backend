import { PartialType } from "@nestjs/mapped-types";
import { CreateEmployeeDto } from "./create-employee.dto";


export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto){}  // makes the dto fields all optional