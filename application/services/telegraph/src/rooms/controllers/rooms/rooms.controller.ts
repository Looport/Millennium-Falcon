import {Controller, Post} from '@nestjs/common'

import {RoomsService} from '@/rooms/services/rooms/rooms.service'
import {RoomEntity} from '@/storage/entities/room.entity'

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  async createRoom(): Promise<RoomEntity> {
    return this.roomsService.create()
  }
}
