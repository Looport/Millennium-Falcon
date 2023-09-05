import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'

import {UserController} from './user.controller'

import {UserEntity} from '@/user/entities/user/user.entity'

@Module({
  controllers: [UserController],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}
