import {Controller, Get} from '@nestjs/common'

import {ActiveUser} from '@/authorization/decorators/active-user.decorator'
import {ActiveUserInterface} from '@/authorization/interfaces/active-user.interface'
import {Serialize} from '@/common/interceptors/serialize.interceptor'
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
