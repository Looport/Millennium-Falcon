import {AuthModule} from '@looport/nest-auth'
import {MicroserviceModule} from '@looport/nest-microservice'
import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'

import {GLOBAL_PROVIDERS} from '@/app/library/app.global-providers'
import {getAuthModuleAsyncOptions} from '@/app/library/auth-module-options'
import {getMicroserviceModuleAsyncOptions} from '@/app/library/microservice-module-options'
import {AuthenticationModule} from '@/authentication/authentication.module'
import {UserModule} from '@/user/user.module'

import {AppController} from './controllers/app/app.controller'

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot(),
    MicroserviceModule.forRootAsync(getMicroserviceModuleAsyncOptions()),
    AuthModule.forRootAsync(getAuthModuleAsyncOptions()),
    AuthenticationModule,
    UserModule,
  ],
  providers: [...GLOBAL_PROVIDERS],
})
export class AppModule {}
