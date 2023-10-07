import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'

import {MessagesEntity} from '@/storage/entities/message.entity'
import {RoomEntity} from '@/storage/entities/room.entity'
import {UserEntity} from '@/storage/entities/user.entity'
import {MessageRepository} from '@/storage/repositories/message/message.repository'
import {RoomRepository} from '@/storage/repositories/room/room.repository'
import {UserRepository} from '@/storage/repositories/user/user.repository'
import {StorageConfigService} from '@/storage/services/storage-config.service'
import {getTypeormModuleOptions} from '@/storage/services/typeorm-module-options'

@Module({
  exports: [
    StorageConfigService,
    UserRepository,
    RoomRepository,
    MessageRepository,
  ],
  imports: [
    TypeOrmModule.forRootAsync(getTypeormModuleOptions()),
    TypeOrmModule.forFeature([UserEntity, RoomEntity, MessagesEntity]),
  ],
  providers: [
    StorageConfigService,
    UserRepository,
    RoomRepository,
    MessageRepository,
  ],
})
export class StorageModule {}
