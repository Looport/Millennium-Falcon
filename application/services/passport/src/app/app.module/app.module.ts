import {Module} from '@nestjs/common'

import {AppController} from '@/app/app.controller/app.controller'
import {AuthenticationModule} from '@/authentication/authentication.module/authentication.module'
import {UserModule} from '@/user/user. module/user.module'

@Module({
  controllers: [AppController],
  imports: [AuthenticationModule, UserModule],
})
export class AppModule {}
