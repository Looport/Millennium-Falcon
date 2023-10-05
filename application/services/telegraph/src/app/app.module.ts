import {AuthModule} from '@looport/nest-auth'
import {MicroservicesModule} from '@looport/nest-microservices'
import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'

import {GLOBAL_PROVIDERS} from '@/app/common/global-providers'
import {AuthConfigService} from '@/app/services/auth-config/auth-config.service'
import {getAuthModuleAsyncOptions} from '@/app/services/auth-config/auth-module-options'
import {MicroservicesConfigService} from '@/app/services/microservcies-config/microservices-config.service'
import {getMicroservicesModuleAsyncOptions} from '@/app/services/microservcies-config/microservices-module-options'
import {UserModule} from '@/user/user.module'

import {AppController} from './contollers/app/app.controller'

@Module({
  controllers: [AppController],
  exports: [MicroservicesConfigService, AuthConfigService],
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MicroservicesModule.forRootAsync(getMicroservicesModuleAsyncOptions()),
    AuthModule.forRootAsync(getAuthModuleAsyncOptions()),
    UserModule,
  ],
  providers: [
    ...GLOBAL_PROVIDERS,
    MicroservicesConfigService,
    AuthConfigService,
  ],
})
export class AppModule {}
