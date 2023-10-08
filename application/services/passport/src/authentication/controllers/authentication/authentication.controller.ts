import {Auth, AuthType} from '@looport/nest-auth'
import {NatsService} from '@looport/nest-microservice'
import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common'

import {CredentialsDto} from '@/authentication/dto/credentials.dto'
import {AuthenticationService} from '@/authentication/services/authentication/authentication.service'

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly natsService: NatsService
  ) {}

  @Auth(AuthType.None)
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() credentials: CredentialsDto) {
    const {accessToken, user} = await this.authenticationService.register(
      credentials
    )

    this.natsService.emit('passport.user.registered', user)

    return {
      accessToken,
    }
  }

  @Auth(AuthType.None)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() credentials: CredentialsDto) {
    const {accessToken} = await this.authenticationService.login(credentials)

    return {
      accessToken,
    }
  }
}
