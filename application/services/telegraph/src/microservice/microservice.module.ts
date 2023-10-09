import {Module} from '@nestjs/common'

import {MicroserviceConfigService} from '@/microservice/services/microservice-config/microservice-config.service'

@Module({
  exports: [MicroserviceConfigService],
  providers: [MicroserviceConfigService],
})
export class MicroserviceModule {}
