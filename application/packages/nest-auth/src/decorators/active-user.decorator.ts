import {createParamDecorator, ExecutionContext} from '@nestjs/common'

import {REQUEST_ACTIVE_USER_KEY} from '../middleware/token/token.middleware.constants'
import {ActiveUserJwtPayload} from '../services/token/interfaces/active-user-jwt-payload.interface'

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserJwtPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const user: ActiveUserJwtPayload | undefined =
      request.raw[REQUEST_ACTIVE_USER_KEY]
    return field ? user?.[field] : user
  }
)
