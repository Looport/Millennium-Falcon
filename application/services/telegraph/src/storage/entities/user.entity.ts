import {Column, Entity, PrimaryColumn} from 'typeorm'

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  id: number

  @Column()
  email: string

  @Column()
  passwordHash: string
}
