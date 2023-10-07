import {Injectable} from '@nestjs/common'

import {RoomEntity} from '@/storage/entities/room.entity'
import {RoomRepository} from '@/storage/repositories/room/room.repository'

@Injectable()
export class RoomsService {
  constructor(private readonly roomRepository: RoomRepository) {}

  create(): Promise<RoomEntity> {
    return this.roomRepository.save(
      this.roomRepository.create({url: this.generateUrl()})
    )
  }

  generateUrl() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    return new Array(7)
      .fill(0)
      .reduce(
        (url) =>
          `${url}${characters.charAt(
            Math.floor(Math.random() * characters.length)
          )}`,
        ''
      )
  }
}
