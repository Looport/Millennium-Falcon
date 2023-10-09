import {AuthModule} from '@looport/nest-auth'
import {MicroserviceModule} from '@looport/nest-microservice'
import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'

import {GLOBAL_PROVIDERS} from '@/app/library/app.global-providers'
import {AuthConfigService} from '@/app/services/auth-config/auth-config.service'
import {getAuthModuleAsyncOptions} from '@/app/services/auth-config/auth-module-options'
import {MicroserviceConfigService} from '@/app/services/microservice-config/microservice-config.service'
import {getMicroserviceModuleAsyncOptions} from '@/app/services/microservice-config/microservice-module-options'
import {AuthenticationModule} from '@/authentication/authentication.module'
import {UserModule} from '@/user/user.module'

import {AppController} from './controllers/app/app.controller'

@Module({
  controllers: [AppController],
  exports: [MicroserviceConfigService, AuthConfigService],
  imports: [
    ConfigModule.forRoot(),
    MicroserviceModule.forRootAsync(getMicroserviceModuleAsyncOptions()),
    AuthModule.forRootAsync(getAuthModuleAsyncOptions()),
    AuthenticationModule,
    UserModule,
  ],
  providers: [
    ...GLOBAL_PROVIDERS,
    MicroserviceConfigService,
    AuthConfigService,
  ],
})
export class AppModule {}
