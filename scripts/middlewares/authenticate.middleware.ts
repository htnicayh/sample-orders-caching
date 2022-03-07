import {
    Injectable,
    NestMiddleware,
    HttpException,
    HttpStatus
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
    Request,
    Response,
    NextFunction
} from 'express'
import { CustomLogger } from 'scripts/logger/logger.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly configService: ConfigService,
        private readonly customLogger: CustomLogger
    ) {}

    use(request: Request, _: Response, next: NextFunction) {
        const tokenDefault = '#' + this.configService.get('TOKEN_SECRET')

        const { authorization } = request.headers
        if (authorization && authorization.match(/^Bearer /)) {
            const token = authorization.split(' ')[1]
            if (token && token === tokenDefault) {
                next()
            } else {
                // this.customLogger.debug(`${JSON.stringify(tokenDefault)}`, 'AuthMiddleware')
                
                this.customLogger.error('Permission Denied', 'AuthMiddleware')
                throw new HttpException('Permission Denied', HttpStatus.UNAUTHORIZED)
            }
        } else {
            this.customLogger.error('Missing Token', 'AuthMiddleware')
            throw new HttpException('Missing Token', HttpStatus.FORBIDDEN)
        }
    }
}