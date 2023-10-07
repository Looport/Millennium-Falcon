import {Controller, Post} from '@nestjs/common'

import {RoomRepository} from '@/storage/repositories/room/room.repository'

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomRepository: RoomRepository) {}

  @Post()
  async createRoom() {
    const url = 'fakeurl'
    const room = await this.roomRepository.save(
      this.roomRepository.create({url})
    )
    return room
  }
}
