import {AuthModule} from '@looport/nest-auth'
import {Module} from '@nestjs/common'

import {StorageModule} from '@/storage/storage.module'

import {UserController} from './user.controller'

@Module({
  controllers: [UserController],
  imports: [StorageModule, AuthModule],
})
export class UserModule {}
