import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common'
import {JwtModule} from '@nestjs/jwt'

import {GLOBAL_PROVIDERS} from './common/global-providers'
import {AccessTokenGuard} from './guards/access-token/access-token.guard'
import {AuthModuleAsyncOptions} from './interfaces/auth-module-options.interface'
import {TokenMiddleware} from './middleware/token/token.middleware'
import {TokenService} from './services/token/token.service'

@Module({})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('*')
  }

  static forRootAsync(options: AuthModuleAsyncOptions): DynamicModule {
    return {
      exports: [TokenService],
      global: true,
      imports: [
        JwtModule.registerAsync({
          imports: options.imports,
          inject: options.inject,
          useFactory: (...args) => options.useFactory(...args).jwt,
        }),
      ],
      module: AuthModule,
      providers: [...GLOBAL_PROVIDERS, TokenService, AccessTokenGuard],
    }
  }
}
