import {Module} from '@nestjs/common'
import {EventEmitterModule} from '@nestjs/event-emitter'

import {MessageEventService} from '@/event/services/message-event.service'

@Module({
  exports: [MessageEventService],
  imports: [EventEmitterModule.forRoot()],
  providers: [MessageEventService],
})
export class EventModule {}
