import {DynamicModule, Module} from '@nestjs/common'

import {
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} from './library/microservice-module-options'
import {MicroserviceCoreModule} from './microservice-core.module'
import {NatsService} from './services/nats/nats.service'

@Module({
  exports: [NatsService],
  imports: [MicroserviceCoreModule],
  providers: [NatsService],
})
export class MicroserviceModule {
  static forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    return {
      exports: [NatsService],
      global: options.isGlobal,
      imports: [MicroserviceCoreModule.register(options)],
      module: MicroserviceModule,
      providers: [NatsService],
    }
  }

  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return {
      exports: [NatsService],
      global: options.isGlobal,
      imports: [MicroserviceCoreModule.registerAsync(options)],
      module: MicroserviceModule,
      providers: [NatsService],
    }
  }
}
