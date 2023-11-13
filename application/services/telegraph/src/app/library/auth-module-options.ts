import {ASYNC_OPTIONS_TYPE} from '@looport/nest-auth'
import {ConfigModule, ConfigService} from '@nestjs/config'

export const getAuthModuleAsyncOptions = (): typeof ASYNC_OPTIONS_TYPE => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    jwt: {
      secret: configService.getOrThrow('JWT_SECRET'),
      signOptions: {expiresIn: configService.getOrThrow('JWT_EXPIRES')},
    },
  }),
})
