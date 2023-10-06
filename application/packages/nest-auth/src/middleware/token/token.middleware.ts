import {Injectable, NestMiddleware} from '@nestjs/common'

import {TokenService} from '../../services/token/token.service'

import {REQUEST_ACTIVE_USER_KEY} from './token.middleware.constants'

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}

  async use(req: any, res: any, next: () => void) {
    const authorizationHeader = req.headers.authorization

    if (authorizationHeader) {
      const [, token] = authorizationHeader.split(' ') ?? []
      req[REQUEST_ACTIVE_USER_KEY] = await this.tokenService.unwrap(token)
    }

    next()
  }
}
