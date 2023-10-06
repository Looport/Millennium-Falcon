import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'

import {UserEntity} from '@/storage/entities/user.entity'
import {UserRepository} from '@/storage/repositories/user/user.repository'
import {StorageConfigService} from '@/storage/services/storage-config.service'
import {getTypeormModuleOptions} from '@/storage/services/typeorm-module-options'

@Module({
  exports: [UserRepository, StorageConfigService],
  imports: [
    TypeOrmModule.forRootAsync(getTypeormModuleOptions()),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserRepository, StorageConfigService],
})
export class StorageModule {}
