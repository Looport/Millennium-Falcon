import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config/dist/config.module'
import {TypeOrmModule} from '@nestjs/typeorm'

import {MessageEntity} from '@/storage/entities/message.entity'
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
    ConfigModule,
    TypeOrmModule.forRootAsync(getTypeormModuleOptions()),
    TypeOrmModule.forFeature([UserEntity, RoomEntity, MessageEntity]),
  ],
  providers: [
    StorageConfigService,
    UserRepository,
    RoomRepository,
    MessageRepository,
  ],
})
export class StorageModule {}
