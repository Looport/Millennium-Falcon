import {UserResponse} from '@/auth/interfaces/user-response.interface'
import {RoomResponse} from '@/room/interfaces/room-response.interface'

export interface CreateMessageResponse {
  id: number

  text: string

  room: RoomResponse

  user: UserResponse
}
