import {ActiveUser, ActiveUserInterface} from '@looport/nest-auth'
import {Serialize} from '@looport/nest-common'
import {Body, Controller, Param, Post, Sse} from '@nestjs/common'
import {EventEmitter2} from '@nestjs/event-emitter'
import {plainToInstance} from 'class-transformer'
import {fromEvent, map, skipWhile} from 'rxjs'

import {CreateMessageDto} from '@/messages/dto/create-message.dto'
import {MessageDto} from '@/messages/dto/message.dto'
import {MessagesService} from '@/messages/services/messages/messages.service'
import {RoomsService} from '@/rooms/services/rooms/rooms.service'
import {MessagesEntity} from '@/storage/entities/message.entity'
import {RoomEntity} from '@/storage/entities/room.entity'

@Controller('rooms')
export class RoomsController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly roomsService: RoomsService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @Post()
  async createRoom(): Promise<RoomEntity> {
    return this.roomsService.create()
  }

  @Serialize(MessageDto)
  @Post(':id/messages')
  async createMessage(
    @Param('id') roomId: number,
    @ActiveUser() activeUser: ActiveUserInterface,
    @Body() createMessageDto: CreateMessageDto
  ): Promise<MessagesEntity> {
    const message = await this.messagesService.create({
      ...createMessageDto,
      roomId,
      userId: activeUser.sub,
    })

    this.eventEmitter.emit(
      `room.[${roomId}].message`,
      plainToInstance(MessageDto, message, {excludeExtraneousValues: true})
    )

    return message
  }

  @Sse(':id/messages/subscribe')
  subscribeMessages(
    @Param('id') roomId: number,
    @ActiveUser() activeUser: ActiveUserInterface
  ) {
    return fromEvent(this.eventEmitter, `room.[${roomId}].message`).pipe(
      skipWhile(
        (message: MessagesEntity) => message.user.id === activeUser.sub
      ),
      map((message: MessagesEntity) => ({data: message}))
    )
  }
}
