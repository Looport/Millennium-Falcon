import {redirect} from 'next/navigation'
import React from 'react'

import JoinModal from '@/app/@modal/(...)join/join-modal'
import {
  FormVariant,
  getSignFromVariantSearchQuery,
  isLogin,
  isRegister,
} from '@/ui/auth/components/sign/lib/form-variant'
import {LoginForm} from '@/ui/auth/components/sign/login-form'
import {RegisterForm} from '@/ui/auth/components/sign/register-from'

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
    <JoinModal>
      {isRegister(variant) && <RegisterForm />}
      {isLogin(variant) && <LoginForm />}
    </JoinModal>
  )
}
