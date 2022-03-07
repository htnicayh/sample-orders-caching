import { Injectable } from "@nestjs/common";
import { RedisService } from "../cache/redis.service";
import { CustomLogger } from "../logger/logger.service";
import { OrdersService } from "../orders/orders.service";
import { Cron } from '@nestjs/schedule'
import * as moment from 'moment'

@Injectable()
export class SchedulesService {
    // CronJob here (Research)
    constructor(
        private readonly redisService: RedisService,
        private readonly ordersService: OrdersService,
        private readonly customLogger: CustomLogger
    ) {}

    private static getReportsDate(): string {
        const today = new Date()
        const yesterday = new Date()

        // CronJob in the next day
        yesterday.setDate(today.getDate() - 1)
        const yesterdayFormat = moment(yesterday).format('YYYY-MM-DD')
        return yesterdayFormat
    }

    @Cron('0 1 0 * * *')
    public async cacheDailyReport(): Promise<void> {
        this.customLogger.debug('Caching redis daily reports', 'SchedulesService')

        // Get Report yesterday
        const reportDate = SchedulesService.getReportsDate()

        // Get Information orders yesterday
        const dailyReport = await this.ordersService.queryDailyReport(reportDate)

        // Set in cache Redis
        await this.redisService.set(reportDate, dailyReport)
    }
}