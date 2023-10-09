import {AuthModuleOptions} from '@looport/nest-auth'
import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'

@Injectable()
export class AuthConfigService {
  constructor(private readonly configService: ConfigService) {}

  getAuthConfig(): AuthModuleOptions {
    return {
      jwt: {
        secret: this.configService.getOrThrow('JWT_SECRET'),
        signOptions: {expiresIn: this.configService.getOrThrow('JWT_EXPIRES')},
      },
    }
  }
}
