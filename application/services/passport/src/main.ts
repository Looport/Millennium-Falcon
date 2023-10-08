import {MicroserviceModuleOptions} from '@looport/nest-microservice'
import {ConfigService} from '@nestjs/config'
import {NestFactory} from '@nestjs/core'
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'

import {AppModule} from '@/app/app.module'
import {MicroserviceConfigService} from '@/config/services/microservice-config/microservice-config.service'

const EXPOSED_IP = '0.0.0.0'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {cors: true}
  )

  const microserviceConfigService = app.get(MicroserviceConfigService)
  app.connectMicroservice<MicroserviceModuleOptions>(
    microserviceConfigService.getNATSConfig()
  )
  await app.startAllMicroservices()

  const configService = app.get(ConfigService)
  await app.listen(configService.get('PORT') ?? 3000, EXPOSED_IP)
}

bootstrap()
