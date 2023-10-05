import {Injectable, NestMiddleware} from '@nestjs/common'

import {REQUEST_ACTIVE_USER_KEY} from '../../common/constants'
import {TokenService} from '../../services/token/token.service'

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
