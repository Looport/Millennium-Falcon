import {Module} from '@nestjs/common'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {JwtModule} from '@nestjs/jwt'
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices'

import {AuthenticationController} from '@/authentication/authentication.controller'
import {AuthenticationService} from '@/authentication/services/authentication/authentication.service'
import {AuthenticationConfigService} from '@/authentication/services/authentication-config.service'
import {PasswordHashService} from '@/authentication/services/password-hash/password-hash.service'
import {StorageModule} from '@/storage/storage.module'

@Module({
  controllers: [AuthenticationController],
  exports: [AuthenticationConfigService],
  imports: [
    JwtModule.registerAsync({
      /**
       * Should be global, until JwtService used directly.
       * Example: token.middleware from authorization
       */
      global: true,
      imports: [AuthenticationModule],
      inject: [AuthenticationConfigService],
      useFactory: (authenticationConfigService: AuthenticationConfigService) =>
        authenticationConfigService.getJWTConfig(),
    }),
    ClientsModule.register([
      {
        name: 'NATS_CLIENT',
        transport: Transport.NATS,
      },
    ]),
    ConfigModule,
    StorageModule,
  ],
  providers: [
    AuthenticationService,
    PasswordHashService,
    AuthenticationConfigService,
    {
      inject: [ConfigService],
      provide: 'MATH_SERVICE',
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          options: {
            name: 'NATS_CLIENT',
            servers: [configService.getOrThrow('NATS_URL')],
          },
          transport: Transport.NATS,
        }),
    },
  ],
})
export class AuthenticationModule {}
