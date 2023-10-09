import {MicroserviceModule as LooportMicroserviceModule} from '@looport/nest-microservice'
import {Module} from '@nestjs/common'

import {MicroserviceConfigService} from '@/microservice/services/microservice-config/microservice-config.service'
import {getMicroserviceModuleAsyncOptions} from '@/microservice/services/microservice-config/microservice-module-options'

@Module({
  exports: [LooportMicroserviceModule, MicroserviceConfigService],
  imports: [
    LooportMicroserviceModule.registerAsync(
      getMicroserviceModuleAsyncOptions()
    ),
  ],
  providers: [MicroserviceConfigService],
})
export class MicroserviceModule {}
