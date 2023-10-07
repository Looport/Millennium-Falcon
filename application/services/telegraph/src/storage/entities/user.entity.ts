import {Column, Entity, OneToMany, PrimaryColumn, Relation} from 'typeorm'

import {MessagesEntity} from '@/storage/entities/message.entity'

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  id: number

  @Column()
  email: string

  @OneToMany(() => MessagesEntity, (message) => message.room)
  messages: Relation<MessagesEntity[]>
}
