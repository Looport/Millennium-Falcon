import {AuthOptions} from '@looport/nest-auth'
import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'

@Injectable()
export class AuthenticationConfigService {
  constructor(private readonly configService: ConfigService) {}

  getAuthConfig(): AuthOptions {
    return {
      jwt: {
        secret: this.configService.getOrThrow('JWT_SECRET'),
        signOptions: {expiresIn: this.configService.getOrThrow('JWT_EXPIRES')},
      },
    }
  }
}
