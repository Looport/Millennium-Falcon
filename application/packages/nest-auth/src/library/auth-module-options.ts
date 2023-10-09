import {ConfigurableModuleBuilder} from '@nestjs/common'
import {JwtModuleOptions} from '@nestjs/jwt'

export interface AuthModuleOptions {
  jwt: JwtModuleOptions
}

export const {OPTIONS_TYPE, ASYNC_OPTIONS_TYPE} =
  new ConfigurableModuleBuilder<AuthModuleOptions>()
    .setExtras({isGlobal: false})
    .build()
