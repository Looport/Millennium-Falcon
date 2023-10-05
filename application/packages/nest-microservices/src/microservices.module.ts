import {DynamicModule, Module} from '@nestjs/common'
import {ClientsModule} from '@nestjs/microservices'

import {NATS_CLIENT_KEY} from './common/clients-module-options/constants'
import {MicroservicesModuleOptionsInterface} from './interfaces/microservices-module-options.interface'
import {NatsService} from './services/nats/nats.service'

@Module({})
export class MicroservicesModule {
  static forRootAsync(
    options: MicroservicesModuleOptionsInterface
  ): DynamicModule {
    return {
      exports: [NatsService],
      global: true,
      imports: [
        ClientsModule.registerAsync([
          {
            imports: options.imports ?? [],
            inject: options.inject ?? [],
            name: NATS_CLIENT_KEY,
            useFactory: options.useFactory,
          },
        ]),
      ],
      module: MicroservicesModule,
      providers: [NatsService],
    }
  }
}
