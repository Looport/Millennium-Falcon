import {redirect} from 'next/navigation'
import React from 'react'

import JoinModal from '@/app/@modal/(...)join/join-modal'
import {LoginForm} from '@/ui/auth/components/sign/login-form'
import {RegisterForm} from '@/ui/auth/components/sign/register-from'

export default function Page({
  searchParams,
}: {
  searchParams: {variant?: 'login' | 'register'}
}) {
  const {variant} = searchParams

  if (!variant) {
    return redirect('?variant=register')
  }

  const register = variant === 'register'
  const login = variant === 'login'

  return (
    <JoinModal>
      {register && <RegisterForm />}
      {login && <LoginForm />}
    </JoinModal>
  )
}
