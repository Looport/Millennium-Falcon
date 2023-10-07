import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'

import {RoomEntity} from '@/storage/entities/room.entity'

@Injectable()
export class RoomRepository {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>
  ) {}

  findOne: typeof this.roomRepository.findOne =
    this.roomRepository.findOne.bind(this.roomRepository)

  create: typeof this.roomRepository.create = this.roomRepository.create.bind(
    this.roomRepository
  )

  save: typeof this.roomRepository.save = this.roomRepository.save.bind(
    this.roomRepository
  )

  delete: typeof this.roomRepository.delete = this.roomRepository.delete.bind(
    this.roomRepository
  )
}
