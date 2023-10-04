import {Module} from '@nestjs/common'

import {MicroservicesModule} from '@/microservices/microservices.module'
import {StorageModule} from '@/storage/storage.module'

import {UserController} from './user.controller'

@Module({
  controllers: [UserController],
  imports: [StorageModule, MicroservicesModule],
})
export class UserModule {}
