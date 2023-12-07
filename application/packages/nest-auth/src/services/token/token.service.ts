import {Injectable} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'

import {ActiveUserJwtPayload} from './interfaces/active-user-jwt-payload.interface'

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async unwrap(token: string): Promise<ActiveUserJwtPayload> {
    return this.jwtService.verifyAsync<ActiveUserJwtPayload>(token)
  }

  async wrap({
    email,
    userId,
  }: {
    email: string
    userId: number
  }): Promise<string> {
    return this.jwtService.signAsync({
      email,
      sub: userId,
    })
  }
}
