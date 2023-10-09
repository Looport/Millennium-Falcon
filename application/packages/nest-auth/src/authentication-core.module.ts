import {
  DynamicModule,
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common'
import {JwtModule} from '@nestjs/jwt'

import {AccessTokenGuard} from './guards/access-token/access-token.guard'
import {ASYNC_OPTIONS_TYPE, OPTIONS_TYPE} from './library/auth-module-options'
import {GLOBAL_PROVIDERS} from './library/auth.global-providers'
import {TokenMiddleware} from './middleware/token/token.middleware'
import {TokenService} from './services/token/token.service'

@Global()
@Module({})
export class AuthCoreModule {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    return {
      exports: [JwtModule],
      imports: [JwtModule.register(options.jwt)],
      module: AuthCoreModule,
    }
  }

  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return {
      exports: [JwtModule],
      imports: [
        JwtModule.registerAsync({
          imports: options.imports,
          inject: options.inject,
          useFactory: async (...args) =>
            (await options.useFactory(...args)).jwt,
        }),
      ],
      module: AuthCoreModule,
    }
  }
}
