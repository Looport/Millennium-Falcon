import {Module} from '@nestjs/common'

import {StorageModule} from '@/storage/storage.module'

import {MessageService} from './services/messages/message.service'

@Module({
  exports: [MessageService],
  imports: [StorageModule],
  providers: [MessageService],
})
export class MessageModule {}
