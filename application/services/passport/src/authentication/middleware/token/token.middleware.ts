import {Injectable, NestMiddleware} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'

import {REQUEST_ACTIVE_USER_KEY} from '@/authentication/middleware/token/constants'

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: any, res: any, next: () => void) {
    const authorizationHeader = req.headers.authorization

    if (authorizationHeader) {
      const [, token] = authorizationHeader.split(' ') ?? []
      req[REQUEST_ACTIVE_USER_KEY] = await this.jwtService.verifyAsync(token)
    }

    next()
  }
}
