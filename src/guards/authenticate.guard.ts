import {
    CanActivate,
    ExecutionContext, Injectable
} from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Observable<any> {
        const ctx = context.switchToHttp()
        const request = ctx.getRequest<Request>()

        const { authorization } = request.headers
        if (authorization && authorization.match(/^Bearer /)) {
            const token = authorization.split(' ')[1]
            if (token === `#${process.env.TOKEN_SECRET}`) {
                return true
            } else {
                return false
            }
        }
        return false
    }
}