import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Store } from 'cache-manager';
import { CustomLogger } from './logger/logger.service';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly store: Store,
    private readonly customLogger: CustomLogger
  ) {}

  async getHello(): Promise<string> {
    await this.store.mset('foo2', 'foo', 'bar2', 'bar', { ttl: 60 })
    const response = await this.store.mget('foo2', 'bar2')
    this.customLogger.log(JSON.stringify(response), 'AppService')

    return 'Hello World!';
  }
}
