import {AuthModule} from '@looport/nest-auth'
import {MicroservicesModule} from '@looport/nest-microservices'
import {Module} from '@nestjs/common'
import {ConfigModule as NestConfigModule} from '@nestjs/config'
import {EventEmitterModule} from '@nestjs/event-emitter'

import {GLOBAL_PROVIDERS} from '@/app/common/app.global-providers'
import {ConfigModule} from '@/config/config.module'
import {getAuthModuleAsyncOptions} from '@/config/services/auth-config/auth-module-options'
import {getMicroservicesModuleAsyncOptions} from '@/config/services/microservcies-config/microservices-module-options'
import {RoomsModule} from '@/rooms/rooms.module'
import {UserModule} from '@/user/user.module'

import {AppController} from './contollers/app/app.controller'

@Module({
  controllers: [AppController],
  imports: [
    NestConfigModule.forRoot({isGlobal: true}),
    EventEmitterModule.forRoot(),
    ConfigModule,
    MicroservicesModule.forRootAsync(getMicroservicesModuleAsyncOptions()),
    AuthModule.forRootAsync(getAuthModuleAsyncOptions()),
    UserModule,
    RoomsModule,
  ],
  providers: [...GLOBAL_PROVIDERS],
})
export class AppModule {}
