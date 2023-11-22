import {redirect} from 'next/navigation'
import React from 'react'

import {
  FormVariant,
  getSignFromVariantSearchQuery,
  isLogin,
  isRegister,
} from '@/ui/auth/components/sign/lib/form-variant'
import {LoginForm} from '@/ui/auth/components/sign/login-form'
import {RegisterForm} from '@/ui/auth/components/sign/register-from'
import {LandingLayout} from '@/ui/home/components/landing-layout'

export default function Page({
  searchParams,
}: {
  searchParams: {variant?: FormVariant}
}) {
  const {variant} = searchParams

  if (!variant) {
    redirect(`?${getSignFromVariantSearchQuery(FormVariant.register)}`)
  }

  return (
    <LandingLayout>
      <div className="w-2/3 mx-auto">
        {isRegister(variant) && <RegisterForm />}
        {isLogin(variant) && <LoginForm />}
      </div>
    </LandingLayout>
  )
}
