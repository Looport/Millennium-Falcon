import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  ModuleMetadata,
  NestModule,
  Provider,
} from '@nestjs/common'
import {JwtModule, JwtModuleOptions} from '@nestjs/jwt'

import {GLOBAL_PROVIDERS} from './common/global-providers'
import {AccessTokenGuard} from './guards/access-token/access-token.guard'
import {TokenMiddleware} from './middleware/token/token.middleware'
import {TokenService} from './services/token/token.service'

export interface AuthOptions {
  jwt: JwtModuleOptions
}

export interface AuthModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  global?: boolean
  useFactory?: (...args: any[]) => AuthOptions
  inject?: any[]
  extraProviders?: Provider[]
}

@Module({
  exports: [TokenService],
  providers: [TokenService, AccessTokenGuard],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('*')
  }

  static forRootAsync(options: AuthModuleAsyncOptions): DynamicModule {
    return {
      exports: [TokenService],
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
