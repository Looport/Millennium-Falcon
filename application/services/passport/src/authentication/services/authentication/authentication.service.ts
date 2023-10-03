import {Injectable} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'

import {CredentialsDto} from '@/authentication/dtos/credentials.dto'
import {
  EMAIL_ALREADY_EXISTS_MESSAGE,
  EMAIL_FIELD_KEY,
  INVALID_LOGIN_CREDENTIALS_MESSAGE,
} from '@/authentication/services/authentication/constants'
import {PasswordHashService} from '@/authentication/services/password-hash/password-hash.service'
import {ValidationException} from '@/common/exeptions/validation.exeption/validation.exception'
import {UserEntity} from '@/user/entities/user/user.entity'

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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

    const token = await this.generateToken({
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

    const token = await this.generateToken({
      email: user.email,
      userId: user.id,
    })

    return {
      accessToken: token,
      user,
    }
  }

  async generateToken({
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
