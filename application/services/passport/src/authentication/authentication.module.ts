import {Module} from '@nestjs/common'

import {AuthenticationController} from '@/authentication/authentication.controller'
import {AuthenticationService} from '@/authentication/services/authentication/authentication.service'
import {AuthenticationConfigService} from '@/authentication/services/authentication-config.service'
import {PasswordHashService} from '@/authentication/services/password-hash/password-hash.service'
import {StorageModule} from '@/storage/storage.module'

@Module({
  controllers: [AuthenticationController],
  exports: [AuthenticationConfigService],
  imports: [StorageModule],
  providers: [
    AuthenticationConfigService,
    AuthenticationService,
    PasswordHashService,
  ],
})
export class AuthenticationModule {}
