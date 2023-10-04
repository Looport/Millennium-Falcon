import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm'

import {UserEntity} from '@/storage/entities/user/user.entity'
import {UserRepository} from '@/storage/repositories/user/user.repository'
import {StorageConfigService} from '@/storage/services/storage-config.service'

@Module({
  exports: [UserRepository, StorageConfigService],
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [StorageModule],
      inject: [StorageConfigService],
      useFactory: (storageConfigService: StorageConfigService) =>
        storageConfigService.getTypeormConfig(),
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserRepository, StorageConfigService],
})
export class StorageModule {}
