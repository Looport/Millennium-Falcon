import {Transport} from '@nestjs/microservices'
import {ClientsModuleOptions} from '@nestjs/microservices/module/interfaces'
import {ClientProviderOptions} from '@nestjs/microservices/module/interfaces/clients-module.interface'

import {NATS_CLIENT_PROVIDER_KEY} from '../decorators/constants'

export const createNATSOptions = ({
  url,
}: {
  url: string
}): ClientProviderOptions => ({
  name: NATS_CLIENT_PROVIDER_KEY,
  options: {
    servers: [url],
  },
  transport: Transport.NATS,
})

export const createNATSClientsOptions = ({
  url,
}: {
  url: string
}): ClientsModuleOptions => ({
  clients: [createNATSOptions({url})],
})
