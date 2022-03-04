import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpErrorFilter } from './filters/http-exception.filter';
import { AuthGuard } from './guards/authenticate.guard';
import { LoggerModule } from './logger/logger.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { PipeValidate } from './utils/pipe';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot(),
    ProductsModule, 
    OrdersModule, 
    LoggerModule
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
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    AppService
  ]
})
export class AppModule {}
