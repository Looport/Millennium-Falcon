'use client'

import {
  JoinForm,
  JoinFormVariantEnum,
} from '@/auth/components/join-form/join-form'
import {setToken} from '@/auth/lib/token.client'
import {requestLogin} from '@/auth/requests/login.request'
import {requestRegister} from '@/auth/requests/register.request'
import {useRefreshPage} from '@/common/hooks/refresh-page'

export const JoinContainer = () => {
  const {refresh} = useRefreshPage()

  const submit = async (data: any, variant: JoinFormVariantEnum) => {
    const action = createSubmitAction(variant)
    await action(data)

    refresh({redirectTo: '/'})
  }

  return <JoinForm onSubmit={submit} />
}

const createSubmitAction = (variant: JoinFormVariantEnum) => {
  const action = {login: requestLogin, register: requestRegister}[variant]

  return async function submit(data: any) {
    const body = await action(data)

    setToken(body.accessToken)

    return body
  }
}
