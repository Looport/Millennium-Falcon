import {JoinSignalRequest} from '@/room/interfaces/signals/join-signal-request.interface'

export interface JoinSignalResponse {
  signal: JoinSignalRequest

  userId: number
}
