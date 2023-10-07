import {Module} from '@nestjs/common'

import {StorageModule} from '@/storage/storage.module'

import {RoomsController} from './controllers/rooms/rooms.controller'

@Module({
  controllers: [RoomsController],
  imports: [StorageModule],
})
export class RoomsModule {}
