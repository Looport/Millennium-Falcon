import {AuthModule} from '@looport/nest-auth'
import {MicroserviceModule} from '@looport/nest-microservice'
import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config/dist/config.module'
import {EventEmitterModule} from '@nestjs/event-emitter'

import {GLOBAL_PROVIDERS} from '@/app/library/app.global-providers'
import {getAuthModuleAsyncOptions} from '@/app/library/auth-module-options'
import {getMicroserviceModuleAsyncOptions} from '@/app/library/microservice-module-options'
import {RoomModule} from '@/room/room.module'
import {UserModule} from '@/user/user.module'

import {AppController} from './contollers/app/app.controller'

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    MicroserviceModule.forRootAsync(getMicroserviceModuleAsyncOptions()),
    AuthModule.forRootAsync(getAuthModuleAsyncOptions()),
    UserModule,
    RoomModule,
  ],
  providers: [...GLOBAL_PROVIDERS],
})
export class AppModule {}
