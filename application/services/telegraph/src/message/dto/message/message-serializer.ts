import {instanceToPlain, plainToInstance} from 'class-transformer'

import {MessageDto} from '@/message/dto/message/message.dto'
import {MessageEntity} from '@/storage/entities/message.entity'

export const serializeMessage = (message: MessageEntity) =>
  instanceToPlain(
    plainToInstance(MessageDto, message, {excludeExtraneousValues: true})
  )
