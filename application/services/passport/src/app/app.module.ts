import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'

import {GLOBAL_PROVIDERS} from '@/app/library/app.global-providers'
import {AuthModule} from '@/auth/auth.module'
import {MicroserviceModule} from '@/microservice/microservice.module'
import {UserModule} from '@/user/user.module'

import {AppController} from './controllers/app/app.controller'

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MicroserviceModule,
    AuthModule,
    UserModule,
  ],
  providers: [...GLOBAL_PROVIDERS],
})
export class AppModule {}
