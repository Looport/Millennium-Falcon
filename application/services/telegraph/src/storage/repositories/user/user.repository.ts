import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'

import {UserEntity} from '@/storage/entities/user.entity'

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  find: typeof this.userRepository.find = this.userRepository.find.bind(
    this.userRepository
  )

  findOneOrFail: typeof this.userRepository.findOneOrFail =
    this.userRepository.findOneOrFail.bind(this.userRepository)

  findOne: typeof this.userRepository.findOne =
    this.userRepository.findOne.bind(this.userRepository)

  create: typeof this.userRepository.create = this.userRepository.create.bind(
    this.userRepository
  )

  save: typeof this.userRepository.save = this.userRepository.save.bind(
    this.userRepository
  )

  delete: typeof this.userRepository.delete = this.userRepository.delete.bind(
    this.userRepository
  )
}
