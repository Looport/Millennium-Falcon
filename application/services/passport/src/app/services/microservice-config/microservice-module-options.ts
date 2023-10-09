import {ASYNC_OPTIONS_TYPE} from '@looport/nest-microservice'

import {AppModule} from '@/app/app.module'
import {MicroserviceConfigService} from '@/app/services/microservice-config/microservice-config.service'

export const getMicroserviceModuleAsyncOptions =
  (): typeof ASYNC_OPTIONS_TYPE => ({
    imports: [AppModule],
    inject: [MicroserviceConfigService],
    useFactory: (configService: MicroserviceConfigService) =>
      configService.getNATSConfig(),
  })
