import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'

import {MessageEntity} from '@/storage/entities/message.entity'

@Entity('rooms')
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({unique: true})
  url: string

  @OneToMany(() => MessageEntity, (message) => message.room)
  messages?: Relation<MessageEntity[]>
}
