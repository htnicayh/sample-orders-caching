import { Injectable, Logger, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerCustom extends Logger {
    error(message: string, trace?: string, context?: string): void {
        super.error(message, trace, context)
    }

    warn(message: string, context?: string): void {
        super.warn(message, context)
    }

    log(message: string, context?: string): void {
        super.log(message, context)
    }

    debug(message: string, context?: string): void {
        super.debug(message, context)
    }
}