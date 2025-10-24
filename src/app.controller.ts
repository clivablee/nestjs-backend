import { BadRequestException, Body, Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { records, type IRecord } from './FakeDatabase';
import { RecordsService } from './app.service';

@Controller()
export class RecordsController {
  constructor(private readonly recordService: RecordsService) { }

  @Get('/records')
  getAllRecords(): IRecord [] {
    return this.recordService.getRecords();
  }

  @Get('/get/records/body')
  getRecords(@Body () body: string[]) {
    return {
      body
    }
    
  } 

    
  @Get('/records/:emp_id')
  getRecordById(@Param('emp_id') emp_id: number): IRecord | undefined {
    const response = this.recordService.findByID(Number(emp_id));
    
      console.log("response", response);
      if (!response) {
        throw new NotFoundException('Record not found');
    }
    return response
  }
}
