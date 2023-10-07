import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'

import {MessagesEntity} from '@/storage/entities/message.entity'

@Injectable()
export class MessageRepository {
  constructor(
    @InjectRepository(MessagesEntity)
    private readonly messageRepository: Repository<MessagesEntity>
  ) {}

  findOne: typeof this.messageRepository.findOne =
    this.messageRepository.findOne.bind(this.messageRepository)

  create: typeof this.messageRepository.create =
    this.messageRepository.create.bind(this.messageRepository)

  save: typeof this.messageRepository.save = this.messageRepository.save.bind(
    this.messageRepository
  )

  delete: typeof this.messageRepository.delete =
    this.messageRepository.delete.bind(this.messageRepository)
}
