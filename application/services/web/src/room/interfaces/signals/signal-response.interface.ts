import {JoinSignalResponse} from '@/room/interfaces/signals/join-signal-response.interface'
import {OfferSignalResponse} from '@/room/interfaces/signals/offer-signal-response.interface'

// TODO: divide response from siganl
export type SignalResponse = JoinSignalResponse | OfferSignalResponse
