import {Expose, Type} from 'class-transformer'

import {RoomDto} from '@/room/dto/room.dto'
import {UserDto} from '@/user/dto/user/user.dto'

export class MessageDto {
  @Expose()
  id: number

  @Expose()
  text: string

  @Expose()
  @Type(() => UserDto)
  user: UserDto

  @Expose()
  @Type(() => RoomDto)
  room: RoomDto
}
