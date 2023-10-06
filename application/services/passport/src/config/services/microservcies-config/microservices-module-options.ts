import {MicroservicesModuleOptionsInterface} from '@looport/nest-microservices'

import {ConfigModule} from '@/config/config.module'
import {MicroservicesConfigService} from '@/config/services/microservcies-config/microservices-config.service'

export const getMicroservicesModuleAsyncOptions =
  (): MicroservicesModuleOptionsInterface => ({
    imports: [ConfigModule],
    inject: [MicroservicesConfigService],
    useFactory: (microservicesConfigService: MicroservicesConfigService) =>
      microservicesConfigService.getNATSConfig(),
  })
