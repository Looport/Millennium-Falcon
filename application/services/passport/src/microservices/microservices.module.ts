import {Module} from '@nestjs/common'
import {ClientsModule} from '@nestjs/microservices'

import {getClientsModuleOptions} from '@/microservices/common/clients-module-options/clients-module-options'
import {MicroservicesConfigService} from '@/microservices/services/microservices-config.service'
import {NatsService} from '@/microservices/services/nats/nats.service'

@Module({
  exports: [MicroservicesConfigService, NatsService],
  imports: [ClientsModule.registerAsync(getClientsModuleOptions())],
  providers: [MicroservicesConfigService, NatsService],
})
export class MicroservicesModule {}
