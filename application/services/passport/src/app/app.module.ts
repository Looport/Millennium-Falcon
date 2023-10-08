import {AuthModule} from '@looport/nest-auth'
import {MicroserviceModule} from '@looport/nest-microservice'
import {Module} from '@nestjs/common'
import {ConfigModule as NestConfigModule} from '@nestjs/config'

import {GLOBAL_PROVIDERS} from '@/app/common/app.global-providers'
import {AuthenticationModule} from '@/authentication/authentication.module'
import {ConfigModule} from '@/config/config.module'
import {getAuthModuleAsyncOptions} from '@/config/services/auth-config/auth-module-options'
import {getMicroserviceModuleAsyncOptions} from '@/config/services/microservice-config/microservice-module-options'
import {UserModule} from '@/user/user.module'

import {AppController} from './controllers/app/app.controller'

@Module({
  controllers: [AppController],
  imports: [
    NestConfigModule.forRoot({isGlobal: true}),
    ConfigModule,
    MicroserviceModule.forRootAsync(getMicroserviceModuleAsyncOptions()),
    AuthModule.forRootAsync(getAuthModuleAsyncOptions()),
    AuthenticationModule,
    UserModule,
  ],
  providers: [...GLOBAL_PROVIDERS],
})
export class AppModule {}
