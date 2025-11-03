import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('employee_information') // matches MySQL table name
export class Employees {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longblob', nullable: true })
  employee_img: Buffer;

  @Column({ length: 255 })
  employee_name: string;

  @Column({ length: 255 })
  first_name: string;

  @Column({ length: 255 })
  middle_name: string;

  @Column({ length: 255 })
  last_name: string;

  @Column({ length: 255, nullable: true })
  mobile_number: string;

  @Column({ length: 255, nullable: true })
  address: string;

  @Column({ length: 255, nullable: true })
  civil_status: string;

  @Column({ length: 255, nullable: true })
  gender: string;

  @Column({ length: 255, nullable: true })
  personal_email: string;

  @Column({ length: 255, nullable: true })
  date_of_birth: string;

  @Column({ length: 255, nullable: true })
  emergency_person: string;

  @Column({ length: 255, nullable: true })
  emergency_number: string;

  @Column({ type: 'int', nullable: true })
  emp_id: number;

  @Column({ length: 255, nullable: true })
  job_title: string;

  @Column({ length: 45, nullable: true })
  income_type: string;

  @Column({ type: 'int', nullable: true })
  salary: number;

  @Column({ type: 'double', nullable: true })
  basic_salary: number;

  @Column({ type: 'double', nullable: true })
  daily_rate: number;

  @Column({ type: 'double', nullable: true })
  hourly_rate: number;

  @Column({ type: 'double', nullable: true })
  minute_rate: number;

  @Column({ length: 255, nullable: true })
  employment_status: string;

  @Column({ length: 255, nullable: true })
  employee_type: string;

  @Column({ length: 255, nullable: true })
  employee_level: string;

  @Column({ length: 255, nullable: true })
  email_work: string;

  @Column({ length: 255, nullable: true })
  assigned_branch: string;

  @Column({ length: 255, nullable: true })
  assigned_city: string;

  @Column({ length: 255, nullable: true })
  department: string;

  @Column({ length: 255, nullable: true })
  immediate_supervisor: string;

  @Column({ length: 255, nullable: true })
  schedule: string;

  @Column({ length: 255, nullable: true })
  hired_date: string;

  @Column({ length: 255, nullable: true })
  third_date: string;

  @Column({ length: 255, nullable: true })
  fifth_date: string;

  @Column({ length: 255, nullable: true })
  regularization_date: string;

  @Column({ length: 255, nullable: true })
  sss_no: string;

  @Column({ length: 255, nullable: true })
  tin_no: string;

  @Column({ length: 255, nullable: true })
  HDMF_no: string;

  @Column({ length: 255, nullable: true })
  philhealth_no: string;

  @Column({ length: 255, nullable: true })
  active_status: string;

  @Column({ length: 255, nullable: true })
  access_rights: string;

  @Column({ length: 255, nullable: true, default: "123" })
  password: string;

  @Column({ length: 255, nullable: true })
  separation_cause: string;

  @Column({ length: 255, nullable: true, default: "1900-12-31" })
  separation_date: string;

  @Column({ length: 45, nullable: true })
  separation_type: string;

  @Column({ length: 255, nullable: true })
  eligibility: string;

  @Column({ length: 255, nullable: true })
  clearance: string;

  @Column({ length: 255, nullable: true })
  payroll_onhold_date: string;

  @Column({ length: 255, nullable: true })
  hmo_deduction_type: string;
}
