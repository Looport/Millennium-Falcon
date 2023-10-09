import {MicroserviceModule} from '@looport/nest-microservice'
import {Module} from '@nestjs/common'

import {StorageModule} from '@/storage/storage.module'

import {UserController} from './controllers/user/user.controller'

@Module({
  controllers: [UserController],
  imports: [MicroserviceModule, StorageModule],
})
export class UserModule {}
