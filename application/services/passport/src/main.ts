import {createNATSOptions} from '@looport/nats'
import {NestFactory} from '@nestjs/core'
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'

import {AppModule} from '@/app/app.module'

const EXPOSED_IP = '0.0.0.0'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {cors: true}
  )

  app.connectMicroservice(
    createNATSOptions({url: process.env.NATS_URL ?? 'localhost'})
  )

  await app.startAllMicroservices()
  await app.listen(3000, EXPOSED_IP)
}

bootstrap()
