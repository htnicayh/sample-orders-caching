import {
  MiddlewareConsumer,
  Module, 
  NestModule
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  APP_FILTER,
  APP_PIPE
} from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './cache/redis.module';
import { HttpErrorFilter } from './filters';
import { LoggerModule } from './logger/logger.module';
import { AuthMiddleware } from './middlewares';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { PipeValidate } from './utils';
import { ReportsModule } from './reports/reports.module';
import { SchedulesModule } from './schedules/schedules.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development'
    }),
    TypeOrmModule.forRoot(),
    ProductsModule, 
    OrdersModule,
    LoggerModule,
    RedisModule,
    ReportsModule,
    SchedulesModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      provide: APP_PIPE,
      useValue: PipeValidate
    },
    AppService
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('products', 'orders', 'reports')
  }
}
