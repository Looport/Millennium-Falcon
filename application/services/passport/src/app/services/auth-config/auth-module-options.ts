import {ASYNC_OPTIONS_TYPE} from '@looport/nest-auth'

import {AppModule} from '@/app/app.module'
import {AuthConfigService} from '@/app/services/auth-config/auth-config.service'

export const getAuthModuleAsyncOptions = (): typeof ASYNC_OPTIONS_TYPE => ({
  imports: [AppModule],
  inject: [AuthConfigService],
  useFactory: (authenticationConfigService: AuthConfigService) =>
    authenticationConfigService.getAuthConfig(),
})
