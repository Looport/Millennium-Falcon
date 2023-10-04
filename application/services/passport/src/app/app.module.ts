import {Module, Provider} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import {APP_PIPE} from '@nestjs/core'

import {AuthenticationModule} from '@/authentication/authentication.module'
import {AuthorizationModule} from '@/authorization/authorization.module'
import {ValidationPipe} from '@/common/pipes/validation.pipe/validation.pipe'
import {UserModule} from '@/user/user.module'

import {AppController} from './app.controller'

const GLOBAL_PROVIDERS: Provider[] = [
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe(),
  },
]

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
