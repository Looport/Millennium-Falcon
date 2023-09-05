import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common'

import {CredentialsDto} from '@/authentication/dtos/credentials.dto'
import {AuthenticationService} from '@/authentication/services/authentication.service/authentication.service'

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() credentials: CredentialsDto) {
    const {accessToken} = await this.authenticationService.register(credentials)

    return {
      accessToken,
    }
  }

  @Post('login')
  login() {
    return {
      accessToken: 'token',
    }
  }
}
