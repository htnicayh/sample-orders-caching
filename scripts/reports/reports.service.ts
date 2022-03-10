import { Injectable } from '@nestjs/common';
import { addDays, format } from 'date-fns';
import { RedisService } from '../cache/redis.service';
import { CustomLogger } from '../logger/logger.service';
import { DailyReportDto } from './dtos';

@Injectable()
export class ReportsService {
    private readonly customLogger = new CustomLogger(ReportsService.name)

    constructor(
        private readonly redisService: RedisService,
        // private readonly schedulesService: SchedulesService
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

        // console.log('getListOfDates - ', new Date(startDate))

        while (currentDate <= lastDate) {
            datesList.push(format(new Date(currentDate), 'yyyy-MM-dd'))
            currentDate = addDays(new Date(currentDate), 1)
        }

        return datesList
    }

    public async getDailyReports(dailyReportDto: DailyReportDto): Promise<any> {
        const { startDate, endDate } = dailyReportDto
        const arrayReportDate = ReportsService.getListOfDates(startDate, endDate)

        const dailyReport = await this.redisService.getMany(arrayReportDate)

        const reports = {}
        arrayReportDate.forEach((key, index) => {
            reports[key] = dailyReport[index]
        })

        return reports
    }
}
