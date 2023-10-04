import {ConfigService} from '@nestjs/config'
import {NestFactory} from '@nestjs/core'
import {MicroserviceOptions, Transport} from '@nestjs/microservices'
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'

import {AppModule} from '@/app/app.module'

const EXPOSED_IP = '0.0.0.0'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {cors: true}
  )

  const configService = app.get(ConfigService)
  app.connectMicroservice<MicroserviceOptions>({
    options: {
      servers: [configService.getOrThrow('NATS_URL')],
    },
    transport: Transport.NATS,
  })

  await app.startAllMicroservices()
  await app.listen(3000, EXPOSED_IP)
}

bootstrap()
