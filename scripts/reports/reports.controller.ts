import { 
    Body, 
    Controller, 
    Get, 
    Post 
} from '@nestjs/common';
import { DailyReportDto } from './dtos';
import { ReportsService } from './reports.service';
import { SchedulesService } from '../schedules/schedules.service'

@Controller('reports')
export class ReportsController {
    constructor(
        private readonly reportsService: ReportsService,
        private readonly schedulesService: SchedulesService 
    ) {}

    @Post()
    public async getDailyReport(@Body() dailyReportDto: DailyReportDto): Promise<void> {
        return await this.reportsService.getDailyReports(dailyReportDto)
    }

    /*
        @Get()
        public async testCronJob(): Promise<void> {
            return await this.schedulesService.cacheDailyReport()
        }
    */

    
    @Get()
    public async testCronJob(): Promise<void> {
        return await this.schedulesService.cacheDailyReport()
    }
}
