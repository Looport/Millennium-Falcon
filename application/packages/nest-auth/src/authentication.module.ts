import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common'

import {AuthCoreModule} from './authentication-core.module'
import {AccessTokenGuard} from './guards/access-token/access-token.guard'
import {ASYNC_OPTIONS_TYPE, OPTIONS_TYPE} from './library/auth-module-options'
import {GLOBAL_PROVIDERS} from './library/auth.global-providers'
import {TokenMiddleware} from './middleware/token/token.middleware'
import {TokenService} from './services/token/token.service'

@Module({
  exports: [TokenService],
  imports: [AuthCoreModule],
  providers: [TokenService, AccessTokenGuard],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('*')
  }

  static forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    return {
      exports: [TokenService],
      global: options.isGlobal,
      imports: [AuthCoreModule.register(options)],
      module: AuthModule,
      providers: [...GLOBAL_PROVIDERS, TokenService, AccessTokenGuard],
    }
  }

  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return {
      exports: [TokenService],
      global: options.isGlobal,
      imports: [AuthCoreModule.registerAsync(options)],
      module: AuthModule,
      providers: [...GLOBAL_PROVIDERS, TokenService, AccessTokenGuard],
    }
  }
}
