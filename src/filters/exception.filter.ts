import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { LoggerCustom } from 'src/logger/logger.service'
import { Response } from 'express'
import { QueryFailedError } from 'typeorm'

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
    constructor(
        private readonly loggerCustom: LoggerCustom
    ) {}

    private static handleResponse(res: Response, exception: HttpException | QueryFailedError | Error): void {
        let response: any = {
            message: 'Internal Server Error'
        }
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR

        if (exception instanceof HttpException) {
            response = exception.getResponse()
            statusCode = exception.getStatus()
        } else if (exception instanceof QueryFailedError) {
            statusCode = HttpStatus.BAD_REQUEST
            response = {
                statusCode,
                message: exception.message
            }
        } else if (exception instanceof Error) {
            response = {
                statusCode,
                message: exception.stack
            }
        }

        res.status(statusCode).json(response)
    } 

    catch(exception: HttpException | Error, host: ArgumentsHost): void {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()

        this.handleMessage(exception)

        HttpErrorFilter.handleResponse(response, exception)
    }

    private handleMessage(exception: HttpException | QueryFailedError | Error): void {
        let message = 'Internal Server Error'

        if (exception instanceof HttpException) {
            message = JSON.stringify(exception.getResponse())
        } else if (exception instanceof QueryFailedError) {
            message = exception.stack.toString()
        } else if (exception instanceof Error) {
            message = exception.stack.toString()
        }

        this.loggerCustom.error(message)
    }
}