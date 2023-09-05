import {Controller, Get} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'

import {ActiveUser} from '@/authorization/decorators/active-user.decorator'
import {ActiveUserInterface} from '@/authorization/interfaces/active-user.interface'
import {Serialize} from '@/common/interceptors/serialize.interceptor'
import {UserDto} from '@/user/dots/user.dto'
import {UserEntity} from '@/user/entities/user/user.entity'

@Serialize(UserDto)
@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  @Get('iam')
  async iam(@ActiveUser() activeUser: ActiveUserInterface) {
    return this.userRepository.findOne({
      where: {id: activeUser.sub},
    })
  }
}
