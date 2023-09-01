import {Injectable} from '@nestjs/common'

import {RegisterCredentialsDto} from '@/authentication/dtos/register-credentials.dto'

@Injectable()
export class AuthenticationService {
  async register(
    credentials: RegisterCredentialsDto
  ): Promise<{accessToken: string}> {
    return {accessToken: 'token'}
  }
}
