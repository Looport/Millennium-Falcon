import {Injectable} from '@nestjs/common'
import {EventEmitter2} from '@nestjs/event-emitter'

import {serializeMessage} from '@/message/dto/message/message-serializer'
import {createMessageCreatedSubject} from '@/message/services/message-event/message-event.service.lib'
import {MessageEntity} from '@/storage/entities/message.entity'

@Injectable()
export class MessageEventService {
  constructor(public readonly eventEmitter: EventEmitter2) {}

  emitMessageCreatedEvent(roomId: number, message: MessageEntity): void {
    this.eventEmitter.emit(
      createMessageCreatedSubject(roomId),
      serializeMessage(message)
    )
  }
}
