import {ConfigurableModuleBuilder} from '@nestjs/common'
import {NatsOptions} from '@nestjs/microservices'

export type MicroserviceModuleOptions = NatsOptions

export const {OPTIONS_TYPE, ASYNC_OPTIONS_TYPE} =
  new ConfigurableModuleBuilder<MicroserviceModuleOptions>()
    .setClassMethodName('forRoot')
    .setExtras({isGlobal: false})
    .build()
