import {Module} from '@nestjs/common'

import {MessageService} from '@/message/services/message/message.service'
import {MessageEventService} from '@/message/services/message-event/message-event.service'
import {StorageModule} from '@/storage/storage.module'

@Module({
  exports: [MessageService, MessageEventService],
  imports: [StorageModule],
  providers: [MessageService, MessageEventService],
})
export class MessageModule {}
