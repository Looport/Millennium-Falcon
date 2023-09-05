import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  passwordHash: string
}
