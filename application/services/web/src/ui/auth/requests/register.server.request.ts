'use server'

import {TokenResponse} from '@/auth/interfaces/token-response.interface'
import {requestRegister} from '@/auth/requests/register.request'
import {getServerHeaders} from '@/ui/common/lib/headers.server'

export const requestServerRegister = async (
  data: any
): Promise<TokenResponse> =>
  requestRegister(data, {headers: getServerHeaders()})
