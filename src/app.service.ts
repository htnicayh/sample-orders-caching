import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CustomLogger } from './logger/logger.service';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly customLogger: CustomLogger
  ) {}

  async getHello(): Promise<string> {
    await this.cacheManager.set('foo2', 'bar2', { ttl: 100000 })
    const response = await this.cacheManager.get('foo2')
    this.customLogger.log(JSON.stringify(response), 'AppService')

    return 'Hello World!';
  }
}
