import {NestFactory} from '@nestjs/core'
import {MicroserviceOptions} from '@nestjs/microservices'
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'

import {AppModule} from '@/app/app.module'
import {MicroservicesConfigService} from "@/microservices/services/microservices-config.service";

const EXPOSED_IP = '0.0.0.0'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {cors: true}
  )

  const microservicesConfigService = app.get(MicroservicesConfigService)
  app.connectMicroservice<MicroserviceOptions>(microservicesConfigService.getNATSConfig())

  await app.startAllMicroservices()
  await app.listen(3000, EXPOSED_IP)
}

bootstrap()
