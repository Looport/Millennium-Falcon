import {createParamDecorator, ExecutionContext} from '@nestjs/common'

import {ActiveUserInterface} from '@/authentication/interfaces/active-user.interface'
import {REQUEST_ACTIVE_USER_KEY} from '@/authentication/middleware/token/constants'

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserInterface, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const user: ActiveUserInterface | undefined =
      request.raw[REQUEST_ACTIVE_USER_KEY]
    return field ? user?.[field] : user
  }
)
