import {mock} from "node:test";
import {NatsService} from "@/microservices/services/nats/nats.service";

type NatsMockService = {
  [method in keyof NatsService]: ReturnType<(typeof mock)['fn']>
}

export const createNatsMockService = (
  spies?: Partial<NatsMockService>
): Partial<NatsMockService> => {
  const emit = mock.fn()
  const send = mock.fn()

  return {
    emit,
    send,
    ...spies,
  }
}
