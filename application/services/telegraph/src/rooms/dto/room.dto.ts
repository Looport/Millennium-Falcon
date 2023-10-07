import {Expose} from 'class-transformer'

export class RoomDto {
  @Expose()
  id: number

  @Expose()
  url: string
}
