'use server'

import {redirect} from 'next/navigation'

import {requestLogin} from '@/auth/requests/login.request'
import {requestRegister} from '@/auth/requests/register.request'
import {setServerToken} from '@/ui/auth/lib/token.server'

export const loginAction = async (formData: FormData) => {
  const {accessToken} = await requestLogin({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  authenticateUser(accessToken)
}

export const registerAction = async (formData: FormData) => {
  const {accessToken} = await requestRegister({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  authenticateUser(accessToken)
}

function authenticateUser(accessToken: string) {
  setServerToken(accessToken)

  redirect('/')
}
