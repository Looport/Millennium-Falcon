import {Injectable} from '@nestjs/common'
import {EventEmitter2} from '@nestjs/event-emitter'

import {Signal} from '@/room/dto/signal/interfaces/signal.interface'
import {OfferSignalDto} from '@/room/dto/signal/offer-signal.dto'
import {SignalPayloadInterface} from '@/room/services/signal-event/interfaces/signal-payload.interface'
import {createSignalSubject} from '@/room/services/signal-event/signal-event.service.lib'

@Injectable()
export class SignalEventService {
  constructor(public readonly eventEmitter: EventEmitter2) {}

  emitSignalEvent(roomId: number, signal: Signal, userId: number): void {
    const payload: SignalPayloadInterface = {
      signal,
      userId,
    }
    this.eventEmitter.emit(createSignalSubject(roomId), payload)
  }

  guardSignal(
    signalPayload: SignalPayloadInterface,
    activeUserId: number
  ): boolean {
    return signalPayload.userId !== activeUserId
  }

  guardOffer(
    signal: OfferSignalDto,
    signalOwnerId: number,
    activeUserId: number
  ): boolean {
    return [
      this.guardSignal({signal, userId: signalOwnerId}, activeUserId),
      signal.data.receiverUserId !== activeUserId,
    ].every((check) => check)
  }
}
