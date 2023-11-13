'use client'

import {requestLogin} from '@/auth/requests/login.request'
import {requestRegister} from '@/auth/requests/register.request'
import {JoinForm, JoinFormVariantEnum} from '@/ui/auth/components/join-form'
import {setToken} from '@/ui/auth/lib/token'
import {useRefreshPage} from '@/ui/common/hooks/refresh-page'

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
