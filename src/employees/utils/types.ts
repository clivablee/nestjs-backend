// to be saved data in db
export class createUser {
  emp_id: number;
  employee_name: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  salary: number
  basic_salary: number
  daily_rate: number
  hourly_rate: number
  minute_rate: number
}

export interface UpdateUser{
  department?: string
  first_name?: string
  middle_name?: string
  last_name?: string
  employee_name?: string
}
