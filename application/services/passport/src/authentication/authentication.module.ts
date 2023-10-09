import {AuthModule} from '@looport/nest-auth'
import {MicroserviceModule} from '@looport/nest-microservice'
import {Module} from '@nestjs/common'

import {AuthenticationController} from '@/authentication/controllers/authentication/authentication.controller'
import {AuthenticationService} from '@/authentication/services/authentication/authentication.service'
import {PasswordHashService} from '@/authentication/services/password-hash/password-hash.service'
import {StorageModule} from '@/storage/storage.module'

@Module({
  controllers: [AuthenticationController],
  imports: [MicroserviceModule, AuthModule, StorageModule],
  providers: [AuthenticationService, PasswordHashService],
})
export class AuthenticationModule {}
