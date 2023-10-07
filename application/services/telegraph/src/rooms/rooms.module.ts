import {Module} from '@nestjs/common'

import {StorageModule} from '@/storage/storage.module'

import {RoomsController} from './controllers/rooms/rooms.controller'
import {RoomsService} from './services/rooms/rooms.service'

@Module({
  controllers: [RoomsController],
  imports: [StorageModule],
  providers: [RoomsService],
})
export class RoomsModule {}
