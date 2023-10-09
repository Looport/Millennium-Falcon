import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'

import {RoomEntity} from '@/storage/entities/room.entity'
import {UserEntity} from '@/storage/entities/user.entity'

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @ManyToOne(() => RoomEntity, (room) => room.messages, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  room?: Relation<RoomEntity>

  @ManyToOne(() => UserEntity, (user) => user.messages, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user?: Relation<UserEntity>
}
