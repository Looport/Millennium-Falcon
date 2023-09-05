import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common'

import {CredentialsDto} from '@/authentication/dtos/credentials.dto'
import {AuthenticationService} from '@/authentication/services/authentication/authentication.service'
import {AuthType} from '@/authorization/decorators/auth/auth-types.enum'
import {Auth} from '@/authorization/decorators/auth/auth.decorator'

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Auth(AuthType.None)
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() credentials: CredentialsDto) {
    const {accessToken} = await this.authenticationService.register(credentials)

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
