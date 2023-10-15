import {AuthModule} from '@looport/nest-auth'
import {Module} from '@nestjs/common'

import {MessageModule} from '@/message/message.module'
import {StorageModule} from '@/storage/storage.module'

import {RoomController} from './controllers/rooms/room.controller'
import {RoomService} from './services/rooms/room.service'

@Module({
  controllers: [RoomController],
  imports: [AuthModule, StorageModule, MessageModule],
  providers: [RoomService],
})
export class RoomModule {}
