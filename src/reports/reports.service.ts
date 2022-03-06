import { Injectable } from '@nestjs/common';
import { RedisService } from '../cache/redis.service';
import { format, addDays } from 'date-fns'
import { DailyReportDto } from './dtos';

@Injectable()
export class ReportsService {
    constructor(
        private readonly redisService: RedisService
    ) {}

    /*
        @body startDate
        @body endDate
        @dto DailyReportDto
    */

    private static getListOfDates(startDate: Date, endDate: Date) {
        const datesList = []
        let currentDate = new Date(startDate)
        const lastDate = new Date(endDate)

        while (currentDate <= lastDate) {
            datesList.push(format(new Date(currentDate), 'yyyy-MM-dd'))
            currentDate = addDays(new Date(currentDate), 1)
        }

        return datesList
    }

    public async getDailyReports(dailyReportDto: DailyReportDto) {
        const { startDate, endDate } = dailyReportDto
        const arrayDate = ReportsService.getListOfDates(startDate, endDate)
        console.log('ReportsService - ', arrayDate)
    }
}
