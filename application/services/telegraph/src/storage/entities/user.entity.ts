import {Column, Entity, OneToMany, PrimaryColumn, Relation} from 'typeorm'

import {MessageEntity} from '@/storage/entities/message.entity'

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  id: number

  @Column()
  email: string

  @OneToMany(() => MessageEntity, (message) => message.room)
  messages?: Relation<MessageEntity[]>
}
