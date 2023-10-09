import {AuthModule as LooportAuthModule} from '@looport/nest-auth'
import {Module} from '@nestjs/common'

import {AuthConfigService} from '@/auth/services/auth-config/auth-config.service'
import {getAuthModuleAsyncOptions} from '@/auth/services/auth-config/auth-module-options'

@Module({
  exports: [AuthConfigService],
  imports: [LooportAuthModule.registerAsync(getAuthModuleAsyncOptions())],
  providers: [AuthConfigService],
})
export class AuthModule {}
