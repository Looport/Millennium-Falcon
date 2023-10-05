import {MicroservicesModuleOptionsInterface} from '@looport/nest-microservices'

import {AppModule} from '@/app/app.module'
import {MicroservicesConfigService} from '@/app/services/microservices-config.service'

export const getMicroservicesModuleAsyncOptions =
  (): MicroservicesModuleOptionsInterface => ({
    imports: [AppModule],
    inject: [MicroservicesConfigService],
    useFactory: (microservicesConfigService: MicroservicesConfigService) =>
      microservicesConfigService.getNATSConfig(),
  })
