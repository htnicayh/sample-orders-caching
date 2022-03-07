import { Module } from '@nestjs/common';
import { SchedulesModule } from '../schedules/schedules.module';
import { RedisModule } from '../cache/redis.module';
import { OrdersModule } from '../orders/orders.module';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports: [
    RedisModule, 
    OrdersModule,
    SchedulesModule
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService]
})
export class ReportsModule {}
