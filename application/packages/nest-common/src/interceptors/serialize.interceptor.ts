import {CallHandler, NestInterceptor, UseInterceptors} from '@nestjs/common'
import {ClassConstructor, plainToInstance} from 'class-transformer'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'

export function Serialize(dto: ClassConstructor<unknown>) {
  return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor<unknown>) {}

  intercept(__, handler: CallHandler): Observable<any> {
    return handler
      .handle()
      .pipe(
        map((data: any) =>
          plainToInstance(this.dto, data, {excludeExtraneousValues: true})
        )
      )
  }
}
