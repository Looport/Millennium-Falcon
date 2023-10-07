import {ActiveUser, ActiveUserInterface} from '@looport/nest-auth'
import {Serialize} from '@looport/nest-common'
import {Body, Controller, Param, Post} from '@nestjs/common'

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
    private readonly roomsService: RoomsService
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
    return this.messagesService.create({
      ...createMessageDto,
      roomId,
      userId: activeUser.sub,
    })
  }
}
