import {Module} from '@nestjs/common'

import {EventModule} from '@/event/event.module'
import {MessageModule} from '@/message/message.module'
import {StorageModule} from '@/storage/storage.module'

import {RoomController} from './controllers/rooms/room.controller'
import {RoomService} from './services/rooms/room.service'

@Module({
  controllers: [RoomController],
  imports: [StorageModule, EventModule, MessageModule],
  providers: [RoomService],
})
export class RoomModule {}
