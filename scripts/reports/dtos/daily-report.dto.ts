import { IsDateString } from 'class-validator'

export class DailyReportDto {
    @IsDateString()
    readonly startDate: Date

    @IsDateString()
    readonly endDate: Date
}