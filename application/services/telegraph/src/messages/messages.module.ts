import {Module} from '@nestjs/common'

import {StorageModule} from '@/storage/storage.module'

import {MessagesService} from './services/messages/messages.service'

@Module({
  exports: [MessagesService],
  imports: [StorageModule],
  providers: [MessagesService],
})
export class MessagesModule {}
