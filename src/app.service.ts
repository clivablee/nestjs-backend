import { Injectable } from '@nestjs/common';
import { records, type IRecord } from './FakeDatabase';

@Injectable()
export class RecordsService {
  getHello(): string {
    return 'Hello World!';
  }

  getRecords(): IRecord[] {
    return records
  }

  findByID(emp_id: number): IRecord | undefined {
    console.log(emp_id)
    const data = records.find(r => r.emp_id === emp_id);
    return data
  }

}

