import {Provider} from '@nestjs/common'
import {APP_GUARD} from '@nestjs/core'

import {AuthenticationGuard} from '../guards/auth/auth.guard'

export const GLOBAL_PROVIDERS: Provider[] = [
  {
    provide: APP_GUARD,
    useClass: AuthenticationGuard,
  },
]
