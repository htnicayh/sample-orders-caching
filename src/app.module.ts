import {
  CacheModule,
  Module
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  APP_FILTER,
  APP_GUARD,
  APP_PIPE
} from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpErrorFilter } from './filters';
import { AuthGuard } from './guards';
import { LoggerModule } from './logger/logger.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { PipeValidate } from './utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(<string>process.env.REDIS_PORT)
      }
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
