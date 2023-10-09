import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config/dist/config.module'

import {GLOBAL_PROVIDERS} from '@/app/library/app.global-providers'
import {AuthModule} from '@/auth/auth.module'
import {MicroserviceModule} from '@/microservice/microservice.module'
import {RoomModule} from '@/room/room.module'
import {UserModule} from '@/user/user.module'

import {AppController} from './contollers/app/app.controller'

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MicroserviceModule,
    AuthModule,
    UserModule,
    RoomModule,
  ],
  providers: [...GLOBAL_PROVIDERS],
})
export class AppModule {}
