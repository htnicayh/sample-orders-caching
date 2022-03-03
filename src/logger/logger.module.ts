import { Global, Module } from '@nestjs/common';
import { LoggerCustom } from './logger.service';

@Global()
@Module({
    providers: [LoggerCustom],
    exports: [LoggerCustom]
})
export class LoggerModule {}
