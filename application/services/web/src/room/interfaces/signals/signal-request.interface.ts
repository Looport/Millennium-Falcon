import {JoinSignalRequest} from '@/room/interfaces/signals/join-signal-request.interface'
import {OfferSignalRequest} from '@/room/interfaces/signals/offer-signal-request.interface'

export type SignalRequest = JoinSignalRequest | OfferSignalRequest
