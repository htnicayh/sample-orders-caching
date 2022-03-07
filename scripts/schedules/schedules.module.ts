import { Module } from '@nestjs/common';
import { RedisModule } from '../cache/redis.module';
import { OrdersModule } from '../orders/orders.module';
import { SchedulesService } from './schedules.service';

@Module({
    imports: [
        RedisModule,
        OrdersModule
    ],
    providers: [SchedulesService],
    exports: [SchedulesService]
})
export class SchedulesModule {}