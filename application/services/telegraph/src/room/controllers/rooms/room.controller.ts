import {ActiveUser, ActiveUserInterface} from '@looport/nest-auth'
import {Serialize} from '@looport/nest-common'
import {Body, Controller, Param, Post, Sse} from '@nestjs/common'
import {fromEvent, map, skipWhile} from 'rxjs'

import {MessageEventService} from '@/event/services/message-event.service'
import {createMessageCreatedSubject} from '@/event/services/message-event.service.lib'
import {CreateMessageDto} from '@/message/dto/create-message.dto'
import {MessageDto} from '@/message/dto/message/message.dto'
import {MessageService} from '@/message/services/messages/message.service'
import {RoomService} from '@/room/services/rooms/room.service'
import {MessageEntity} from '@/storage/entities/message.entity'
import {RoomEntity} from '@/storage/entities/room.entity'

@Controller('rooms')
export class RoomController {
  constructor(
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
    private readonly messageEventService: MessageEventService
  ) {}

  @Post()
  async createRoom(): Promise<RoomEntity> {
    return this.roomService.create()
  }

  @Serialize(MessageDto)
  @Post(':id/messages')
  async createMessage(
    @Param('id') roomId: number,
    @ActiveUser() activeUser: ActiveUserInterface,
    @Body() createMessageDto: CreateMessageDto
  ): Promise<MessageEntity> {
    const message = await this.messageService.create({
      ...createMessageDto,
      roomId,
      userId: activeUser.sub,
    })

    this.messageEventService.emitMessageCreatedEvent(roomId, message)

    return message
  }

  @Sse(':id/messages/subscribe')
  subscribeMessages(
    @Param('id') roomId: number,
    @ActiveUser() activeUser: ActiveUserInterface
  ) {
    return fromEvent(
      this.messageEventService.eventEmitter,
      createMessageCreatedSubject(roomId)
    ).pipe(
      skipWhile((message: MessageEntity) => message.user.id === activeUser.sub),
      map((message: MessageEntity) => ({data: message}))
    )
  }
}
