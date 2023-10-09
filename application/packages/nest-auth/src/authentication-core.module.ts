import {DynamicModule, Global, Module} from '@nestjs/common'
import {JwtModule} from '@nestjs/jwt'

import {ASYNC_OPTIONS_TYPE, OPTIONS_TYPE} from './library/auth-module-options'

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
