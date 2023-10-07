import {Module} from '@nestjs/common'

import {MessagesModule} from '@/messages/messages.module'
import {StorageModule} from '@/storage/storage.module'

import {RoomsController} from './controllers/rooms/rooms.controller'
import {RoomsService} from './services/rooms/rooms.service'

@Module({
  controllers: [RoomsController],
  imports: [StorageModule, MessagesModule],
  providers: [RoomsService],
})
export class RoomsModule {}
