import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common'

import {REQUEST_ACTIVE_USER_KEY} from '../../common/auth.constants'

@Injectable()
export class AccessTokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    return (
      request.raw.headers.authorization && request.raw[REQUEST_ACTIVE_USER_KEY]
    )
  }
}
