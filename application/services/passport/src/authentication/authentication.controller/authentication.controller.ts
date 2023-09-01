import {Controller, Post} from '@nestjs/common'

@Controller('authentication')
export class AuthenticationController {
  @Post('register')
  register() {
    return {
      accessToken: 'token',
    }
  }

  @Post('login')
  login() {
    return {
      accessToken: 'token',
    }
  }
}
