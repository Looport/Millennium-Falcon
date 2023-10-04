import {Controller} from '@nestjs/common'
import {EventPattern, Payload} from '@nestjs/microservices'

import {UserRepository} from '@/storage/repositories/user/user.repository'
import {UserDto} from '@/user/dtos/user/user.dto'

@Controller()
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @EventPattern('passport.user.registered')
  async handleUserRegistered(@Payload() user: UserDto) {
    await this.userRepository.save(this.userRepository.create(user))
  }
}
