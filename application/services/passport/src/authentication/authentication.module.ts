import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common'
import {JwtModule} from '@nestjs/jwt'

import {AuthenticationController} from '@/authentication/authentication.controller'
import {TokenMiddleware} from '@/authentication/middleware/token/token.middleware'
import {AuthenticationService} from '@/authentication/services/authentication/authentication.service'
import {PasswordHashService} from '@/authentication/services/password-hash/password-hash.service'
import {UserModule} from '@/user/user.module'

@Module({
  controllers: [AuthenticationController],
  imports: [
    JwtModule.register({
      global: true,
      secret: 'SECRET_JWT_STRING',
      signOptions: {expiresIn: '24h'},
    }),
    UserModule,
  ],
  providers: [AuthenticationService, PasswordHashService],
})
export class AuthenticationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('*')
  }
}
