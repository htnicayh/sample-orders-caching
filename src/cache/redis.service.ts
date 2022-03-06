import { Injectable, Inject, CACHE_MANAGER } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class RedisService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cache: Cache
    ) {}

    async get(key: string): Promise<string> {
        return await this.cache.get(key)
    }

    async set(key: string, value: string) {
        await this.cache.set(key, value)
    }
}
