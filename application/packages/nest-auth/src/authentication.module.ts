import {
  DynamicModule,
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

@Module({})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('*')
  }

  forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    return {
      exports: [TokenService],
      global: options.isGlobal,
      imports: [JwtModule.register(options.jwt)],
      module: AuthModule,
      providers: [...GLOBAL_PROVIDERS, TokenService, AccessTokenGuard],
    }
  }

  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return {
      exports: [TokenService],
      global: options.isGlobal,
      imports: [
        JwtModule.registerAsync({
          imports: options.imports,
          inject: options.inject,
          useFactory: async (...args) =>
            (await options.useFactory(...args)).jwt,
        }),
      ],
      module: AuthModule,
      providers: [...GLOBAL_PROVIDERS, TokenService, AccessTokenGuard],
    }
  }
}
