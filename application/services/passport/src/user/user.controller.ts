import {ActiveUser, ActiveUserInterface} from '@looport/nest-auth'
import {Serialize} from '@looport/nest-common'
import {Controller, Get} from '@nestjs/common'

import {UserRepository} from '@/storage/repositories/user/user.repository'
import {UserDto} from '@/user/dtos/user/user.dto'

@Serialize(UserDto)
@Controller('user')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Get('iam')
  async iam(@ActiveUser() activeUser: ActiveUserInterface) {
    return this.userRepository.findOne({
      where: {id: activeUser.sub},
    })
  }
}
