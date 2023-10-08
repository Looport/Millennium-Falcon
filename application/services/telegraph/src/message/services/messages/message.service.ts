import {Injectable} from '@nestjs/common'

import {CreateMessageDto} from '@/message/dto/create-message.dto'
import {MessageEntity} from '@/storage/entities/message.entity'
import {MessageRepository} from '@/storage/repositories/message/message.repository'
import {RoomRepository} from '@/storage/repositories/room/room.repository'
import {UserRepository} from '@/storage/repositories/user/user.repository'

@Injectable()
export class MessageService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly userRepository: UserRepository,
    private readonly messageRepository: MessageRepository
  ) {}

  async create({
    userId,
    roomId,
    ...createMessageDto
  }: CreateMessageDto & {
    userId: number
    roomId: number
  }): Promise<MessageEntity> {
    return this.messageRepository.save(
      this.messageRepository.create({
        ...createMessageDto,
        room: await this.roomRepository.findOneOrFail({where: {id: roomId}}),
        user: await this.userRepository.findOneOrFail({
          where: {id: userId},
        }),
      })
    )
  }
}
