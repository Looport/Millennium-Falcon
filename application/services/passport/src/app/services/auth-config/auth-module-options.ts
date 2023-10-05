import {AuthModuleAsyncOptions} from '@looport/nest-auth'

import {AppModule} from '@/app/app.module'
import {AuthConfigService} from '@/app/services/auth-config/auth-config.service'

export const getAuthModuleAsyncOptions = (): AuthModuleAsyncOptions => ({
  imports: [AppModule],
  inject: [AuthConfigService],
  useFactory: (authenticationConfigService: AuthConfigService) =>
    authenticationConfigService.getAuthConfig(),
})
