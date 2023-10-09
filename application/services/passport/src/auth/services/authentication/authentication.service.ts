import {TokenService} from '@looport/nest-auth'
import {ValidationException} from '@looport/nest-common'
import {Injectable} from '@nestjs/common'

import {CredentialsDto} from '@/auth/dto/credentials.dto'
import {
  EMAIL_ALREADY_EXISTS_MESSAGE,
  EMAIL_FIELD_KEY,
  INVALID_LOGIN_CREDENTIALS_MESSAGE,
} from '@/auth/services/authentication/authentication.service.constants'
import {PasswordHashService} from '@/auth/services/password-hash/password-hash.service'
import {UserEntity} from '@/storage/entities/user.entity'
import {UserRepository} from '@/storage/repositories/user/user.repository'

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly passwordHashService: PasswordHashService
  ) {}

  async register(
    credentials: CredentialsDto
  ): Promise<{accessToken: string; user: UserEntity}> {
    const existedUser = await this.userRepository.findOne({
      where: {email: credentials.email},
    })
    if (existedUser) {
      throw new ValidationException([
        {
          field: EMAIL_FIELD_KEY,
          messages: [EMAIL_ALREADY_EXISTS_MESSAGE],
          value: credentials.email,
        },
      ])
    }

    const user = await this.userRepository.save(
      this.userRepository.create({
        email: credentials.email,
        passwordHash: await this.passwordHashService.createHash(
          credentials.password
        ),
      })
    )

    const token = await this.tokenService.wrap({
      email: user.email,
      userId: user.id,
    })

    return {
      accessToken: token,
      user,
    }
  }

  async login(
    credentials: CredentialsDto
  ): Promise<{accessToken: string; user: UserEntity}> {
    const user = await this.userRepository.findOne({
      where: {email: credentials.email},
    })

    if (!user) {
      throw new ValidationException([
        {
          field: EMAIL_FIELD_KEY,
          messages: [INVALID_LOGIN_CREDENTIALS_MESSAGE],
          value: credentials.email,
        },
      ])
    }

    if (
      !(await this.passwordHashService.validatePassword(
        credentials.password,
        user.passwordHash
      ))
    ) {
      throw new ValidationException([
        {
          field: EMAIL_FIELD_KEY,
          messages: [INVALID_LOGIN_CREDENTIALS_MESSAGE],
          value: credentials.email,
        },
      ])
    }

    const token = await this.tokenService.wrap({
      email: user.email,
      userId: user.id,
    })

    return {
      accessToken: token,
      user,
    }
  }
}
