import {JwtModuleAsyncOptions} from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface'

import {AuthenticationModule} from '@/authentication/authentication.module'
import {AuthenticationConfigService} from '@/authentication/services/authentication-config.service'

export const getJWTModuleAsyncOptions = (): JwtModuleAsyncOptions => ({
  imports: [AuthenticationModule],
  inject: [AuthenticationConfigService],
  useFactory: (authenticationConfigService: AuthenticationConfigService) =>
    authenticationConfigService.getJWTConfig(),
})
