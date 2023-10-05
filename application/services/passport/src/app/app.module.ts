import {AuthModule} from '@looport/nest-auth'
import {MicroservicesModule} from '@looport/nest-microservices'
import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'

import {GLOBAL_PROVIDERS} from '@/app/common/global-providers'
import {getMicroservicesModuleAsyncOptions} from '@/app/common/microservices-module-options'
import {MicroservicesConfigService} from '@/app/services/microservices-config.service'
import {AuthenticationModule} from '@/authentication/authentication.module'
import {getAuthModuleAsyncOptions} from '@/authentication/common/auth-module-options'
import {UserModule} from '@/user/user.module'

import {AppController} from './app.controller'

@Module({
  controllers: [AppController],
  exports: [MicroservicesConfigService],
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MicroservicesModule.forRootAsync(getMicroservicesModuleAsyncOptions()),
    AuthModule.forRootAsync(getAuthModuleAsyncOptions()),
    AuthenticationModule,
    UserModule,
  ],
  providers: [...GLOBAL_PROVIDERS, MicroservicesConfigService],
})
export class AppModule {}
