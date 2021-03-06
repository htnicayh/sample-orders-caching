import { CacheModule, Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import * as redisStore from 'cache-manager-redis-store'
import { RedisService } from "./redis.service"

@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    store: redisStore,
                    host: configService.get('REDIS_HOST'),
                    port: configService.get('REDIS_PORT'),
                    ttl: configService.get('REDIS_TTL')
                }
            },
            isGlobal: true
        }),
    ],
    providers: [RedisService],
    exports: [RedisService]
})
export class RedisModule {}