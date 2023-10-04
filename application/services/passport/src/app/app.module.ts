import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'

import {GLOBAL_PROVIDERS} from '@/app/common/global-providers'
import {AuthenticationModule} from '@/authentication/authentication.module'
import {AuthorizationModule} from '@/authorization/authorization.module'
import {UserModule} from '@/user/user.module'

import {AppController} from './app.controller'

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    AuthenticationModule,
    AuthorizationModule,
    UserModule,
  ],
  providers: [...GLOBAL_PROVIDERS],
})
export class AppModule {}
