import { Body, Controller, Post } from '@nestjs/common';
import { DailyReportDto } from './dtos';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
    constructor(
        private readonly reportsService: ReportsService
    ) {}

    @Post()
    public async getDailyReport(@Body() dailyReportDto: DailyReportDto): Promise<void> {
        return await this.reportsService.getDailyReports(dailyReportDto)
    }
}
