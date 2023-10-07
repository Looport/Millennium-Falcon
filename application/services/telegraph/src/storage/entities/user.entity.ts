import {Column, Entity, PrimaryColumn} from 'typeorm'

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  id: number

  @Column()
  email: string

  @Column()
  passwordHash: string
}
