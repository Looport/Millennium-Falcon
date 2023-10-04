import {AuthModule} from '@looport/nest-auth'
import {Module} from '@nestjs/common'

import {AuthenticationController} from '@/authentication/authentication.controller'
import {getAuthModuleAsyncOptions} from '@/authentication/common/auth-module-async-options'
import {AuthenticationService} from '@/authentication/services/authentication/authentication.service'
import {AuthenticationConfigService} from '@/authentication/services/authentication-config.service'
import {PasswordHashService} from '@/authentication/services/password-hash/password-hash.service'
import {MicroservicesModule} from '@/microservices/microservices.module'
import {StorageModule} from '@/storage/storage.module'

@Module({
  controllers: [AuthenticationController],
  exports: [AuthenticationConfigService],
  imports: [
    MicroservicesModule,
    StorageModule,
    AuthModule.forRootAsync(getAuthModuleAsyncOptions()),
  ],
  providers: [
    AuthenticationConfigService,
    AuthenticationService,
    PasswordHashService,
  ],
})
export class AuthenticationModule {}
