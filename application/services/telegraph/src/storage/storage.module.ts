import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'

import {RoomEntity} from '@/storage/entities/room.entity'
import {UserEntity} from '@/storage/entities/user.entity'
import {RoomRepository} from '@/storage/repositories/room/room.repository'
import {UserRepository} from '@/storage/repositories/user/user.repository'
import {StorageConfigService} from '@/storage/services/storage-config.service'
import {getTypeormModuleOptions} from '@/storage/services/typeorm-module-options'

@Module({
  exports: [StorageConfigService, UserRepository, RoomRepository],
  imports: [
    TypeOrmModule.forRootAsync(getTypeormModuleOptions()),
    TypeOrmModule.forFeature([UserEntity, RoomEntity]),
  ],
  providers: [StorageConfigService, UserRepository, RoomRepository],
})
export class StorageModule {}
