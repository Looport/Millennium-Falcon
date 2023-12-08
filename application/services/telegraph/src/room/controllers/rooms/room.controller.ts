import {ActiveUser, ActiveUserJwtPayload} from '@looport/nest-auth'
import {Serialize} from '@looport/nest-common'
import {Body, Controller, Get, Param, Post, Sse} from '@nestjs/common'
import {filter, fromEvent, map} from 'rxjs'

import {CreateMessageDto} from '@/message/dto/create-message.dto'
import {MessageDto} from '@/message/dto/message/message.dto'
import {MessageService} from '@/message/services/message/message.service'
import {MessageEventService} from '@/message/services/message-event/message-event.service'
import {createMessageCreatedSubject} from '@/message/services/message-event/message-event.service.lib'
import {SignalEnum} from '@/room/dto/signal/enums/signal.enum'
import {Signal} from '@/room/dto/signal/interfaces/signal.interface'
import {RoomService} from '@/room/services/rooms/room.service'
import {SignalPayloadInterface} from '@/room/services/signal-event/interfaces/signal-payload.interface'
import {SignalEventService} from '@/room/services/signal-event/signal-event.service'
import {createSignalSubject} from '@/room/services/signal-event/signal-event.service.lib'
import {MessageEntity} from '@/storage/entities/message.entity'
import {RoomEntity} from '@/storage/entities/room.entity'

@Controller('rooms')
export class RoomController {
  constructor(
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
    private readonly messageEventService: MessageEventService,
    private readonly signalEventService: SignalEventService
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
    @ActiveUser() activeUser: ActiveUserJwtPayload,
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
    @ActiveUser() activeUser: ActiveUserJwtPayload
  ) {
    return fromEvent(
      this.messageEventService.eventEmitter,
      createMessageCreatedSubject(roomId)
    ).pipe(
      filter((message: MessageEntity) =>
        this.messageEventService.guardMessage(message, activeUser.sub)
      ),
      map((message: MessageEntity) => ({
        data: message,
      }))
    )
  }

  @Post(':roomId/signals')
  async sendSignal(
    @Param('roomId') roomId: number,
    @ActiveUser() activeUser: ActiveUserJwtPayload,
    @Body() signalDto: Signal
  ): Promise<Signal> {
    // eslint-disable-next-line no-warning-comments
    // TODO: add validation depends on signal type

    this.signalEventService.emitSignalEvent(roomId, signalDto, activeUser.sub)

    return signalDto
  }

  @Sse(':id/signals/subscribe')
  subscribeSignals(
    @Param('id') roomId: number,
    @ActiveUser() activeUser: ActiveUserJwtPayload
  ) {
    return fromEvent(
      this.signalEventService.eventEmitter,
      createSignalSubject(roomId)
    ).pipe(
      filter((signalPayload: SignalPayloadInterface) => {
        switch (signalPayload.signal.type) {
          case SignalEnum.offer: {
            return this.signalEventService.guardOffer(
              signalPayload.signal,
              signalPayload.userId,
              activeUser.sub
            )
          }
          case SignalEnum.join:
            return this.signalEventService.guardSignal(
              signalPayload,
              activeUser.sub
            )
          default:
            return false
        }
      }),
      map((signalPayload: SignalPayloadInterface) => ({
        data: signalPayload,
      }))
    )
  }
}
