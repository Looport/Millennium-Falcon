import {TokenService} from '@looport/nest-auth'
import {NestFastifyApplication} from '@nestjs/platform-fastify'

import {UserEntity} from '@/storage/entities/user.entity'
import {UserRepository} from '@/storage/repositories/user/user.repository'
import {userMock} from '@/storage/repositories/user/user.repository.mock'

export interface AuthTestData {
  token: string
  user: UserEntity
}

export const generateAuthTestData = async (app: NestFastifyApplication) => {
  const tokenService = app.get<TokenService>(TokenService)
  const userRepository = app.get<UserRepository>(UserRepository)
  const user = await userRepository.save(userRepository.create(userMock))
  return {
    token: await tokenService.wrap({email: user.email, userId: user.id}),
    user,
  }
}
