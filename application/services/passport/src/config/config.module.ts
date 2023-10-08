import {Module} from '@nestjs/common'

import {AuthConfigService} from '@/config/services/auth-config/auth-config.service'
import {MicroserviceConfigService} from '@/config/services/microservice-config/microservice-config.service'

@Module({
  exports: [MicroserviceConfigService, AuthConfigService],
  providers: [MicroserviceConfigService, AuthConfigService],
})
export class ConfigModule {}
