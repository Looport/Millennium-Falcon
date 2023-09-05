import {MiddlewareConsumer, Module, NestModule, Provider} from '@nestjs/common'
import {APP_GUARD} from '@nestjs/core'

import {AuthenticationModule} from '@/authentication/authentication.module'
import {AccessTokenGuard} from '@/authorization/guards/access-token/access-token.guard'
import {AuthenticationGuard} from '@/authorization/guards/auth/auth.guard'
import {TokenMiddleware} from '@/authorization/middleware/token/token.middleware'

const GLOBAL_PROVIDERS: Provider[] = [
  {
    provide: APP_GUARD,
    useClass: AuthenticationGuard,
  },
]

@Module({
  imports: [AuthenticationModule],
  providers: [...GLOBAL_PROVIDERS, AccessTokenGuard],
})
export class AuthorizationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('*')
  }
}
