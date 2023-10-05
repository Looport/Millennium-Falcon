import {MicroservicesModule} from '@looport/nest-microservices'
import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'

import {GLOBAL_PROVIDERS} from '@/app/common/global-providers'
import {getMicroservicesModuleOptions} from '@/app/common/microservices-module-options'
import {MicroservicesConfigService} from '@/app/services/microservices-config.service'
import {UserModule} from '@/user/user.module'

import {AppController} from './app.controller'

@Module({
  controllers: [AppController],
  exports: [MicroservicesConfigService],
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MicroservicesModule.forRootAsync(getMicroservicesModuleOptions()),
    UserModule,
  ],
  providers: [...GLOBAL_PROVIDERS, MicroservicesConfigService],
})
export class AppModule {}
