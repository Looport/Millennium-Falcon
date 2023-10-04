import {Injectable} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async unwrap(token: string) {
    return this.jwtService.verifyAsync<{
      email: string
      sub: number
    }>(token)
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
