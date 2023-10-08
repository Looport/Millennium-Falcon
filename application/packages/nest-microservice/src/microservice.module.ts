import {DynamicModule, Module} from '@nestjs/common'
import {ClientsModule} from '@nestjs/microservices'

import {
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} from './library/microservice-module-options'
import {NatsService} from './services/nats/nats.service'
import {NATS_CLIENT_KEY} from './services/nats/nats.service.constants'

@Module({
  exports: [NatsService],
  providers: [NatsService],
})
export class MicroserviceModule {
  static forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    return {
      exports: [NatsService],
      global: options.isGlobal,
      imports: [
        ClientsModule.register([
          {
            name: NATS_CLIENT_KEY,
            ...options,
          },
        ]),
      ],
      module: MicroserviceModule,
      providers: [NatsService],
    }
  }

  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return {
      exports: [NatsService],
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
      module: MicroserviceModule,
      providers: [NatsService],
    }
  }
}
