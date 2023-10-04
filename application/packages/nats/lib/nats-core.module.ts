import {DynamicModule, Global, Module, Provider} from '@nestjs/common'
import {ClientsModule} from '@nestjs/microservices'

import {createNATSClientsOptions} from './common/create-nats-options'
import {NATSService} from './services/nats.service/nats.service'


@Global()
@Module({})
export class NATSCoreModule {
  static forRoot({url}: {url: string}): DynamicModule {
    return {
      exports: [NATSService, ClientsModule],
      imports: [ClientsModule.register(createNATSClientsOptions({url}))],
      module: NATSCoreModule,
      providers: [NATSService],
    }
  }
}
