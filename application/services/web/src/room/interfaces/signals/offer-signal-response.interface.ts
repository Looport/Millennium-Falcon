import {OfferSignalRequest} from '@/room/interfaces/signals/offer-signal-request.interface'

export interface OfferSignalResponse {
  signal: OfferSignalRequest

  userId: number
}
