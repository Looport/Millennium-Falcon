'use server'

import {TokenResponse} from '@/auth/interfaces/token-response.interface'
import {requestLogin} from '@/auth/requests/login.request'
import {getServerHeaders} from '@/ui/common/lib/headers.server'

export const requestServerLogin = async (data: any): Promise<TokenResponse> =>
  requestLogin(data, {headers: getServerHeaders()})
