import {SignalEnum} from '@/room/interfaces/signals/enums/signal.enum'

export interface JoinSignalRequest {
  type: SignalEnum.join
}
