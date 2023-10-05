import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'

import {getTypeormModuleOptions} from '@/storage/common/typeorm-module-options'
import {UserEntity} from '@/storage/entities/user.entity'
import {UserRepository} from '@/storage/repositories/user/user.repository'
import {StorageConfigService} from '@/storage/services/storage-config.service'

@Module({
  exports: [UserRepository, StorageConfigService],
  imports: [
    TypeOrmModule.forRootAsync(getTypeormModuleOptions()),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserRepository, StorageConfigService],
})
export class StorageModule {}
