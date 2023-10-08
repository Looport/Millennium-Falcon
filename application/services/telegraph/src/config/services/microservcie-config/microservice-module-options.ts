import {ASYNC_OPTIONS_TYPE} from '@looport/nest-microservice'

import {ConfigModule} from '@/config/config.module'
import {MicroserviceConfigService} from '@/config/services/microservcie-config/microservice-config.service'

export const getMicroserviceModuleAsyncOptions =
  (): typeof ASYNC_OPTIONS_TYPE => ({
    imports: [ConfigModule],
    inject: [MicroserviceConfigService],
    isGlobal: true,
    useFactory: (configService: MicroserviceConfigService) =>
      configService.getNATSConfig(),
  })
