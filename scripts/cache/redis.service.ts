import { 
    CACHE_MANAGER, 
    Inject, 
    Injectable 
} from "@nestjs/common";
import { Store } from "cache-manager";

@Injectable()
export class RedisService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly store: Store
    ) {}

    async get(key: string): Promise<string> {
        return await this.store.get(key)
    }

    async getMany(keys: string[]): Promise<string[]> {
        return await this.store.mget(keys)
    }

    async set(key: string, value: string) {
        await this.store.set(key, value)
    }
}
