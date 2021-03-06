import {
    Injectable,
    Logger
} from "@nestjs/common";

@Injectable()
export class CustomLogger extends Logger {
    error(message: string, context?: string): void {
        super.error(message, context)
    }

    warn(message: string, context?: string): void {
        super.warn(message, context)
    }

    log(message: string | any, context?: string): void {
        super.log(message, context)
    }

    debug(message: string, context?: string): void {
        super.debug(message, context)
    }
}