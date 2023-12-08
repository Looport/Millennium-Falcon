import {JoinSignalResponse} from '@/room/interfaces/signals/join-signal-response.interface'
import {OfferSignalResponse} from '@/room/interfaces/signals/offer-signal-response.interface'

export type SignalResponse = JoinSignalResponse | OfferSignalResponse
