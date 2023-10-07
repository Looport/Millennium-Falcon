import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'

import {MessagesEntity} from '@/storage/entities/message.entity'

@Entity('rooms')
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({unique: true})
  url: string

  @OneToMany(() => MessagesEntity, (message) => message.room)
  messages: Relation<MessagesEntity[]>
}
