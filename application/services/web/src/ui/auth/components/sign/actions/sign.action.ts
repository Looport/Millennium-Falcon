'use server'

import {redirect} from 'next/navigation'

import {setServerToken} from '@/ui/auth/lib/token.server'
import {requestServerLogin} from '@/ui/auth/requests/login.server.request'
import {requestServerRegister} from '@/ui/auth/requests/register.server.request'

export const loginAction = async (formData: FormData) => {
  const {accessToken} = await requestServerLogin({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  authenticateUser(accessToken)
}

export const registerAction = async (formData: FormData) => {
  const {accessToken} = await requestServerRegister({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  authenticateUser(accessToken)
}

function authenticateUser(accessToken: string) {
  setServerToken(accessToken)

  redirect('/')
}
