import {redirect} from 'next/navigation'
import React from 'react'

import {LoginForm} from '@/ui/auth/components/sign/login-form'
import {RegisterForm} from '@/ui/auth/components/sign/register-from'
import {LandingLayout} from '@/ui/home/components/landing-layout'

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
    <LandingLayout>
      <div className="w-2/3 mx-auto">
        {register && <RegisterForm />}
        {login && <LoginForm />}
      </div>
    </LandingLayout>
  )
}
