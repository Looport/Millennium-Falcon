import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common'

import {AuthenticationModule} from '@/authentication/authentication.module'
import {GLOBAL_PROVIDERS} from '@/authorization/common/global-providers'
import {AccessTokenGuard} from '@/authorization/guards/access-token/access-token.guard'
import {TokenMiddleware} from '@/authorization/middleware/token/token.middleware'

@Module({
  imports: [AuthenticationModule],
  providers: [...GLOBAL_PROVIDERS, AccessTokenGuard],
})
export class AuthorizationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('*')
  }
}
