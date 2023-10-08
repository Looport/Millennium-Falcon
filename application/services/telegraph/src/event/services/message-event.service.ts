import {Injectable} from '@nestjs/common'
import {EventEmitter2} from '@nestjs/event-emitter'

import {createMessageCreatedSubject} from '@/event/services/message-event.service.lib'
import {serializeMessage} from '@/messages/dto/message/message-serializer'
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
