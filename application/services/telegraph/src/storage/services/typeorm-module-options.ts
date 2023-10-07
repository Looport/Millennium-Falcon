import {TypeOrmModuleAsyncOptions} from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface'

import {StorageConfigService} from '@/storage/services/storage-config.service'
import {StorageModule} from '@/storage/storage.module'

export const getTypeormModuleOptions = (): TypeOrmModuleAsyncOptions => ({
  imports: [StorageModule],
  inject: [StorageConfigService],
  useFactory: (storageConfigService: StorageConfigService) =>
    storageConfigService.getTypeormConfig(),
})
