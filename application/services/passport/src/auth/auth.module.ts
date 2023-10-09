import {AuthModule as LooportAuthModule} from '@looport/nest-auth'
import {Module} from '@nestjs/common'

import {AuthenticationController} from '@/auth/controllers/authentication/authentication.controller'
import {AuthConfigService} from '@/auth/services/auth-config/auth-config.service'
import {getAuthModuleAsyncOptions} from '@/auth/services/auth-config/auth-module-options'
import {AuthenticationService} from '@/auth/services/authentication/authentication.service'
import {PasswordHashService} from '@/auth/services/password-hash/password-hash.service'
import {MicroserviceModule} from '@/microservice/microservice.module'
import {StorageModule} from '@/storage/storage.module'

@Module({
  controllers: [AuthenticationController],
  exports: [AuthConfigService],
  imports: [
    LooportAuthModule.registerAsync(getAuthModuleAsyncOptions()),
    MicroserviceModule,
    StorageModule,
  ],
  providers: [AuthConfigService, AuthenticationService, PasswordHashService],
})
export class AuthModule {}
