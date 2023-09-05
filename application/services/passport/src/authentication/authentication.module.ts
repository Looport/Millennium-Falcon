import {Module} from '@nestjs/common'
import {JwtModule} from '@nestjs/jwt'

import {PasswordHashService} from './services/password-hash.service/password-hash.service'

import {AuthenticationController} from '@/authentication/authentication.controller'
import {AuthenticationService} from '@/authentication/services/authentication.service/authentication.service'
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
export class AuthenticationModule {}
