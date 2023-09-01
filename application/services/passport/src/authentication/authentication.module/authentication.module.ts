import {Module} from '@nestjs/common'

import {AuthenticationController} from '../authentication.controller/authentication.controller'

@Module({
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
