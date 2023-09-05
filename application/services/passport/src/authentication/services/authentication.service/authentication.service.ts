import {Injectable} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'

import {CredentialsDto} from '@/authentication/dtos/credentials.dto'
import {
  EMAIL_ALREADY_EXISTS_MESSAGE,
  EMAIL_FIELD_KEY, INVALID_LOGIN_CREDENTIALS_MESSAGE,
} from '@/authentication/services/authentication.service/constants'
import {PasswordHashService} from '@/authentication/services/password-hash.service/password-hash.service'
import {ValidationException} from '@/common/exeptions/validation.exeption/validation.exception'
import {UserEntity} from '@/user/entities/user.entity/user.entity'

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly passwordHashService: PasswordHashService
  ) {}

  async register(credentials: CredentialsDto): Promise<{accessToken: string}> {
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

    const token = await this.jwtService.signAsync({
      email: user.email,
      sub: user.id,
    })

    return {
      accessToken: token,
    }
  }

  async login(credentials: CredentialsDto) {
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

    if (!await this.passwordHashService.validatePassword(credentials.password, user.passwordHash)) {
      throw new ValidationException([
        {
          field: EMAIL_FIELD_KEY,
          messages: [INVALID_LOGIN_CREDENTIALS_MESSAGE],
          value: credentials.email,
        },
      ])
    }

    const token = await this.jwtService.signAsync({
      email: user.email,
      sub: user.id,
    })

    return {
      accessToken: token,
    }
  }
}
