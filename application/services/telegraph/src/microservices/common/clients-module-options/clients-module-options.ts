import {ClientsModuleAsyncOptions} from '@nestjs/microservices/module/interfaces'

import {NATS_CLIENT_KEY} from '@/microservices/common/clients-module-options/constants'
import {MicroservicesModule} from '@/microservices/microservices.module'
import {MicroservicesConfigService} from '@/microservices/services/microservices-config.service'

export const getClientsModuleOptions = (): ClientsModuleAsyncOptions => [
  {
    imports: [MicroservicesModule],
    inject: [MicroservicesConfigService],
    name: NATS_CLIENT_KEY,
    useFactory: (microserviceConfigService: MicroservicesConfigService) =>
      microserviceConfigService.getNATSConfig(),
  },
]
