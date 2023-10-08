import {AuthModule} from '@looport/nest-auth'
import {MicroserviceModule} from '@looport/nest-microservice'
import {Module} from '@nestjs/common'
import {ConfigModule as NestConfigModule} from '@nestjs/config'

import {GLOBAL_PROVIDERS} from '@/app/library/app.global-providers'
import {ConfigModule} from '@/config/config.module'
import {getAuthModuleAsyncOptions} from '@/config/services/auth-config/auth-module-options'
import {getMicroserviceModuleAsyncOptions} from '@/config/services/microservcie-config/microservice-module-options'
import {RoomModule} from '@/room/room.module'
import {UserModule} from '@/user/user.module'

import {AppController} from './contollers/app/app.controller'

@Module({
  controllers: [AppController],
  imports: [
    NestConfigModule.forRoot({isGlobal: true}),
    ConfigModule,
    MicroserviceModule.forRootAsync(getMicroserviceModuleAsyncOptions()),
    AuthModule.forRootAsync(getAuthModuleAsyncOptions()),
    UserModule,
    RoomModule,
  ],
  providers: [...GLOBAL_PROVIDERS],
})
export class AppModule {}
