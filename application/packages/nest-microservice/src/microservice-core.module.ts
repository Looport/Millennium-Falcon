import {DynamicModule, Global, Module} from '@nestjs/common'
import {ClientsModule} from '@nestjs/microservices'

import {
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} from './library/microservice-module-options'
import {NATS_CLIENT_KEY} from './services/nats/nats.service.constants'

@Global()
@Module({})
export class MicroserviceCoreModule {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    return {
      exports: [ClientsModule],
      global: options.isGlobal,
      imports: [
        ClientsModule.register([
          {
            name: NATS_CLIENT_KEY,
            ...options,
          },
        ]),
      ],
      module: MicroserviceCoreModule,
    }
  }

  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return {
      exports: [ClientsModule],
      global: options.isGlobal,
      imports: [
        ClientsModule.registerAsync([
          {
            imports: [...options.imports],
            inject: [...options.inject],
            name: NATS_CLIENT_KEY,
            useFactory: options.useFactory,
          },
        ]),
      ],
      module: MicroserviceCoreModule,
    }
  }
}
