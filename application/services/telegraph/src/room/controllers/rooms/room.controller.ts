import {ActiveUser, ActiveUserInterface} from '@looport/nest-auth'
import {Serialize} from '@looport/nest-common'
import {Body, Controller, Get, Param, Post, Sse} from '@nestjs/common'
import {filter, fromEvent, map} from 'rxjs'

import {CreateMessageDto} from '@/message/dto/create-message.dto'
import {MessageDto} from '@/message/dto/message/message.dto'
import {MessageService} from '@/message/services/message/message.service'
import {MessageEventService} from '@/message/services/message-event/message-event.service'
import {createMessageCreatedSubject} from '@/message/services/message-event/message-event.service.lib'
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

  @Get(':id')
  async findById(@Param('id') id: number): Promise<RoomEntity> {
    return this.roomService.findOne({id})
  }

  @Get('/url/:url')
  async findByUrl(@Param('url') url: string): Promise<RoomEntity> {
    return this.roomService.findOne({url})
  }

  @Get(':roomId/messages')
  async findMessages(
    @Param('roomId') roomId: number
  ): Promise<MessageEntity[]> {
    return this.messageService.find({roomId})
  }

  @Serialize(MessageDto)
  @Post(':roomId/messages')
  async createMessage(
    @Param('roomId') roomId: number,
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
      filter((message: MessageEntity) => message.user.id !== activeUser.sub),
      map((message: MessageEntity) => ({
        data: message,
      }))
    )
  }
}
