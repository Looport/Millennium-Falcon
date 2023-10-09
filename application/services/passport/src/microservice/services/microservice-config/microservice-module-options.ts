import {ASYNC_OPTIONS_TYPE} from '@looport/nest-microservice'

import {MicroserviceModule} from '@/microservice/microservice.module'
import {MicroserviceConfigService} from '@/microservice/services/microservice-config/microservice-config.service'

export const getMicroserviceModuleAsyncOptions =
  (): typeof ASYNC_OPTIONS_TYPE => ({
    imports: [MicroserviceModule],
    inject: [MicroserviceConfigService],
    useFactory: (configService: MicroserviceConfigService) =>
      configService.getNATSConfig(),
  })
