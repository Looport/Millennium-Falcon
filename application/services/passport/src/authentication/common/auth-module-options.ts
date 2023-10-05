import {AuthModuleAsyncOptions} from '@looport/nest-auth'

import {AuthenticationModule} from '@/authentication/authentication.module'
import {AuthenticationConfigService} from '@/authentication/services/authentication-config.service'

export const getAuthModuleAsyncOptions = (): AuthModuleAsyncOptions => ({
  imports: [AuthenticationModule],
  inject: [AuthenticationConfigService],
  useFactory: (authenticationConfigService: AuthenticationConfigService) =>
    authenticationConfigService.getAuthConfig(),
})
