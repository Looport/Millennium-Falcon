import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {JwtModuleOptions} from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface'

@Injectable()
export class AuthenticationConfigService {
  constructor(private readonly configService: ConfigService) {}

  getJWTConfig(): JwtModuleOptions {
    return {
      secret: this.configService.getOrThrow('JWT_SECRET'),
      signOptions: {expiresIn: this.configService.getOrThrow('JWT_EXPIRES')},
    }
  }
}
