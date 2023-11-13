import {MicroserviceOptions} from '@looport/nest-microservice'
import {ConfigService} from '@nestjs/config'
import {NestFactory} from '@nestjs/core'
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'

import {AppModule} from '@/app/app.module'
import {getNatsConfig} from '@/app/library/microservice-module-options'

const EXPOSED_IP = '0.0.0.0'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {cors: true}
  )

  const configService = app.get<ConfigService>(ConfigService)

  app.connectMicroservice<MicroserviceOptions>(getNatsConfig(configService))
  await app.startAllMicroservices()

  await app.listen(configService.get('PORT') ?? 3000, EXPOSED_IP)
}

bootstrap()
