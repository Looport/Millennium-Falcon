import {ASYNC_OPTIONS_TYPE} from '@looport/nest-auth'

import {AuthModule} from '@/auth/auth.module'
import {AuthConfigService} from '@/auth/services/auth-config/auth-config.service'

export const getAuthModuleAsyncOptions = (): typeof ASYNC_OPTIONS_TYPE => ({
  imports: [AuthModule],
  inject: [AuthConfigService],
  useFactory: (authenticationConfigService: AuthConfigService) =>
    authenticationConfigService.getAuthConfig(),
})
