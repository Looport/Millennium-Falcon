import {Module} from '@nestjs/common'
import {JwtModule} from '@nestjs/jwt'

import {AuthenticationController} from '@/authentication/authentication.controller'
import {getJWTModuleAsyncOptions} from '@/authentication/common/jwt-module-async.options'
import {AuthenticationService} from '@/authentication/services/authentication/authentication.service'
import {AuthenticationConfigService} from '@/authentication/services/authentication-config.service'
import {PasswordHashService} from '@/authentication/services/password-hash/password-hash.service'
import {TokenService} from '@/authentication/services/token/token.service'
import {MicroservicesModule} from '@/microservices/microservices.module'
import {StorageModule} from '@/storage/storage.module'

@Module({
  controllers: [AuthenticationController],
  exports: [AuthenticationConfigService, TokenService],
  imports: [
    JwtModule.registerAsync(getJWTModuleAsyncOptions()),
    MicroservicesModule,
    StorageModule,
  ],
  providers: [
    TokenService,
    AuthenticationService,
    PasswordHashService,
    AuthenticationConfigService,
  ],
})
export class AuthenticationModule {}
