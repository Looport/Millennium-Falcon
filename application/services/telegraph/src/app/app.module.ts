import {AuthModule} from '@looport/nest-auth'
import {MicroservicesModule} from '@looport/nest-microservices'
import {Module} from '@nestjs/common'
import {ConfigModule as NestConfigModule} from '@nestjs/config'
import {EventEmitterModule} from '@nestjs/event-emitter'

import {GLOBAL_PROVIDERS} from '@/app/common/app.global-providers'
import {ConfigModule} from '@/config/config.module'
import {getAuthModuleAsyncOptions} from '@/config/services/auth-config/auth-module-options'
import {getMicroservicesModuleAsyncOptions} from '@/config/services/microservcies-config/microservices-module-options'
import {RoomModule} from '@/room/room.module'
import {UserModule} from '@/user/user.module'

import {AppController} from './contollers/app/app.controller'

@Module({
  controllers: [AppController],
  imports: [
    NestConfigModule.forRoot({isGlobal: true}),
    ConfigModule,
    MicroservicesModule.forRootAsync(getMicroservicesModuleAsyncOptions()),
    AuthModule.forRootAsync(getAuthModuleAsyncOptions()),
    UserModule,
    RoomModule,
  ],
  providers: [...GLOBAL_PROVIDERS],
})
export class AppModule {}
