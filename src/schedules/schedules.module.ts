import { Module } from '@nestjs/common'
import { RedisModule } from 'src/cache/redis.module';
import { ReportsModule } from 'src/reports/reports.module';
import { SchedulesService } from './schedules.service';

@Module({
    imports: [
        RedisModule,
        ReportsModule
    ],
    providers: [SchedulesService]
})
export class SchedulesModule {}