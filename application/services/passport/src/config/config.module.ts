import {Module} from '@nestjs/common'

import {AuthConfigService} from '@/config/services/auth-config/auth-config.service'
import {MicroservicesConfigService} from '@/config/services/microservcies-config/microservices-config.service'

@Module({
  exports: [MicroservicesConfigService, AuthConfigService],
  providers: [MicroservicesConfigService, AuthConfigService],
})
export class ConfigModule {}
