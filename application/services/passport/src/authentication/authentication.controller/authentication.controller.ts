import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common'

import {RegisterCredentialsDto} from '@/authentication/dtos/register-credentials.dto'
import {AuthenticationService} from '@/authentication/services/authentication/authentication.service'

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() credentials: RegisterCredentialsDto) {
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
