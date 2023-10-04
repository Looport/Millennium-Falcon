import {createParamDecorator, ExecutionContext} from '@nestjs/common'

import {REQUEST_ACTIVE_USER_KEY} from '@/authorization/common/constants'
import {ActiveUserInterface} from '@/authorization/interfaces/active-user.interface'

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserInterface, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const user: ActiveUserInterface | undefined =
      request.raw[REQUEST_ACTIVE_USER_KEY]
    return field ? user?.[field] : user
  }
)
