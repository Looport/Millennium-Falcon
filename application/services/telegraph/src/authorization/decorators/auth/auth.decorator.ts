import {SetMetadata} from '@nestjs/common'

import {AuthType} from '@/authorization/decorators/auth/auth-types.enum'

export const AUTH_TYPE_KEY = 'authType'

export const Auth = (...args: AuthType[]) => SetMetadata(AUTH_TYPE_KEY, args)
