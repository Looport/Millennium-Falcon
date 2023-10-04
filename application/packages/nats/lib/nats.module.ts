import {DynamicModule, Module, Provider} from '@nestjs/common'

import {NATSCoreModule} from './nats-core.module'
import {NATSService} from './services/nats.service/nats.service'

@Module({
  exports: [NATSService],
  imports: [NATSCoreModule],
  providers: [NATSService],
})
export class NATSModule {
  static forRoot(provider: Provider): DynamicModule {
    return {
      imports: [NATSCoreModule.forRoot({url: ''})],
      module: NATSModule,
    }
  }
}
