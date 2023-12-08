import {JoinSignalDto} from '@/room/dto/signal/join-signal.dto'
import {OfferSignalDto} from '@/room/dto/signal/offer-signal.dto'

export type Signal = JoinSignalDto | OfferSignalDto
