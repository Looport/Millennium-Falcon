import {SignalEnum} from '@/room/interfaces/signals/enums/signal.enum'

export interface OfferSignalData {
  peerId: string
}

export interface OfferSignalRequest {
  type: SignalEnum.offer

  data: OfferSignalData
}
