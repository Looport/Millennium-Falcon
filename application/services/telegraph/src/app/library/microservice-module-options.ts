import {
  ASYNC_OPTIONS_TYPE,
  NatsOptions,
  Transport,
} from '@looport/nest-microservice'
import {ConfigModule, ConfigService} from '@nestjs/config'

export const getMicroserviceModuleAsyncOptions =
  (): typeof ASYNC_OPTIONS_TYPE => ({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: getNatsConfig,
  })

export const getNatsConfig = (configService: ConfigService): NatsOptions => ({
  options: {
    name: 'passport',
    servers: [configService.getOrThrow('NATS_URL')],
  },
  transport: Transport.NATS,
})
