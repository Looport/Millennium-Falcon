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
import {PasswordHashService} from '@/authentication/services/password-hash/password-hash.service'
import {UserEntity} from '@/storage/entities/user/user.entity'
import {StorageModule} from '@/storage/storage.module'
import {UserModule} from '@/user/user.module'

@Module({
  controllers: [AuthenticationController],
  exports: [JwtModule],
  imports: [
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: {expiresIn: configService.getOrThrow('JWT_EXPIRES')},
      }),
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
