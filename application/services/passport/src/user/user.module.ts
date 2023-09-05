import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'

import {UserEntity} from '@/user/entities/user/user.entity'

import {UserController} from './user.controller'

@Module({
  controllers: [UserController],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}
