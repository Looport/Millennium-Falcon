import {Module} from '@nestjs/common'

import {AuthenticationController} from '@/authentication/authentication.controller/authentication.controller'
import {AuthenticationService} from '@/authentication/services/authentication/authentication.service'

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
