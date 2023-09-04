import {Injectable} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'

import {CredentialsDto} from '@/authentication/dtos/credentials.dto'
import {PasswordHashService} from '@/authentication/services/password-hash.service/password-hash.service'
import {ValidationException} from '@/common/exeptions/validation.exception'
import {UserEntity} from '@/user/entities/user.entity'

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
          field: 'email',
          messages: ['email already exists'],
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
}
