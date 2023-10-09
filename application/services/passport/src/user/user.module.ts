import {Module} from '@nestjs/common'

import {AuthModule} from '@/auth/auth.module'
import {StorageModule} from '@/storage/storage.module'

import {UserController} from './controllers/user/user.controller'

@Module({
  controllers: [UserController],
  imports: [StorageModule, AuthModule],
})
export class UserModule {}
