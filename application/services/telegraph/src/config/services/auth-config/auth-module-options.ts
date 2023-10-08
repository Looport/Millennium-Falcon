import {ASYNC_OPTIONS_TYPE} from '@looport/nest-auth'

import {ConfigModule} from '@/config/config.module'
import {AuthConfigService} from '@/config/services/auth-config/auth-config.service'

export const getAuthModuleAsyncOptions = (): typeof ASYNC_OPTIONS_TYPE => ({
  imports: [ConfigModule],
  inject: [AuthConfigService],
  useFactory: (authenticationConfigService: AuthConfigService) =>
    authenticationConfigService.getAuthConfig(),
})
